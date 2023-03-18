package com.example.taskukirja_harjoitus_9_10;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.firebase.ui.auth.AuthUI;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.QuerySnapshot;
import java.util.ArrayList;
import java.util.Collections;
import javax.annotation.Nullable;

public class MainActivity extends AppCompatActivity implements RecyclerViewAdapter.ItemClickListener {
    private final String TAG = "softa";
    private final int NEW_WORD_ACTIVITY_REQUEST_CODE = 1;

    private Context context;

    private ArrayList<Taskukirja> omatTaskukirjat;

    private RecyclerView taskukirjaView;
    private RecyclerViewAdapter mTaskukirjaAdapter;

    private FirebaseFirestore mFirestore;
    private CollectionReference taskukirjaReference;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        context=this;

        mFirestore = FirebaseFirestore.getInstance();
        taskukirjaReference = mFirestore.collection("taskarit");
        mAuth = FirebaseAuth.getInstance();

        omatTaskukirjat = new ArrayList<>();

        taskukirjaView = findViewById(R.id.recyclerviewData);
        taskukirjaView.setLayoutManager(new LinearLayoutManager(this));
        mTaskukirjaAdapter = new RecyclerViewAdapter(this, omatTaskukirjat);
        mTaskukirjaAdapter.setClickListener(this);
        taskukirjaView.setAdapter(mTaskukirjaAdapter);

        muutosKysely();

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(view -> {
            Intent intent = new Intent(MainActivity.this, NewTaskukirjaActivity.class);
            startActivityForResult(intent, NEW_WORD_ACTIVITY_REQUEST_CODE);
        });

        Button buttonUusi=findViewById(R.id.buttonUusi);
        buttonUusi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, NewTaskukirjaActivity.class);
                startActivityForResult(intent, NEW_WORD_ACTIVITY_REQUEST_CODE);
            }
        });

        Button buttonPoistaKaikki=findViewById(R.id.buttonPoistaKaikki);
        buttonPoistaKaikki.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                confirmDeleteAll();
            }
        });

        Button buttonPoistaYksi = findViewById(R.id.buttonpoistaAlkio);
        buttonPoistaYksi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Taskukirja temp= mTaskukirjaAdapter.getTaskukirja();
                if(temp!=null){
                    confirmDelete(temp);
                }else{
                    Snackbar.make(view, "Valitse jokin kirja poistettavaksi klikkaamalla sitä.", 5000)
                            .setAction("Action", null).show();
                    Log.d("Teemun softa", "Ei poistettavaa taskukirjaa valittuna");
                }
            }
        });

        EditText poistettavaNro = findViewById(R.id.editTextPoistettavanNumero);
        Button poistaTietty = findViewById(R.id.buttonpoistaHaettu);
        poistaTietty.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (poistettavaNro.getText().toString().matches(""))
                {
                    Snackbar.make(v, "Syötekenttä on tyhjä.", 5000)
                            .setAction("Action", null).show();
                }
                else
                {
                    Taskukirja temp= findTaskukirja(Integer.parseInt(poistettavaNro.getText().toString()));
                    if(temp!=null){
                        confirmDelete(temp);
                        tyhjenna();
                    }else{
                        Snackbar.make(v, "Kirjaa numerolla " + poistettavaNro.getText() + " ei löytynyt.", 5000)
                                .setAction("Action", null).show();
                        tyhjenna();
                        Log.d("Teemun softa", "Ei poistettavaa taskukirjaa löytynyt");
                    }
                }
            }
        });

        FloatingActionButton buttonApua=findViewById(R.id.fabQuestionMark);
        buttonApua.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Snackbar.make(v, "Voit valita kirjan painamalla sitä. Tämän jälkeen voit poistaa " +
                                "kyseisen kirjan napilla \"POISTA KLIKATTU\".", 6000)
                        .setAction("Action", null).show();
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.signOut:
                signOut(false);
                return true;

            case R.id.signStatus:
                checkCurrentState();
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void signOut(boolean destroy) {
       AuthUI.getInstance().signOut(this).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                Log.d("softa: ", "uloskirjauduttu");
                Toast.makeText(
                        getApplicationContext(),
                        "Uloskirjauduttu onnistuneesti",
                        Toast.LENGTH_LONG).show();
            }
        });
        if (destroy == false) {
            startActivity(new Intent(context, LoginActivity.class));
        } else {
            mAuth = null;
        }
    }

    public void checkCurrentState() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user != null) {
            Toast.makeText(
                    getApplicationContext(),
                    "Kirjautuneena: " + user.getEmail(),
                    Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(
                    getApplicationContext(),
                    "Et ole kirjautunut sisään",
                    Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public boolean onCreatePanelMenu(int featureId, @NonNull Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public void onItemClick(View view, int position) {
        Taskukirja t = mTaskukirjaAdapter.getItem(position);
         Snackbar.make(view, "Valittuna:  " + t.getKirjanNumero() + ". " + t.getKirjanNimi(), 3000).setAction("Action", null).show();
    }

    public void muutosKysely(){
        mFirestore.collection("taskarit").addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(@Nullable QuerySnapshot queryDocumentSnapshots, @Nullable FirebaseFirestoreException e) {
                Log.d(TAG, "nakyman paivitys?");
                    if(queryDocumentSnapshots!=null) {
                        omatTaskukirjat.clear();
                        Log.d(TAG, "löydettiin tavaraa");
                        for (DocumentSnapshot snapshot : queryDocumentSnapshots) {
                            Taskukirja tk = snapshot.toObject(Taskukirja.class);
                            if (tk.getuID() != null && tk.getuID().equals(mAuth.getUid())) {
                                omatTaskukirjat.add(tk);
                                Log.d(TAG, "omatTaskukirjat lisättiin: " + tk.getKirjanNumero()+ ". " + tk.getKirjanNimi());
                            }
                        }
                        Log.d(TAG, omatTaskukirjat.toString());
                        Collections.sort(omatTaskukirjat, (a, b) -> { return a.getKirjanNumero()- b.getKirjanNumero();});
                        mTaskukirjaAdapter.notifyDataSetChanged();
                    }else {
                        Log.d(TAG, "Querysnapshot on null");
                    }
                }
        });
    }

    public void confirmDelete(Taskukirja temp){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setCancelable(true);
        builder.setTitle("Vahvista kirjan poisto");
        builder.setMessage("Oletko varma, että haluat poistaa kirjan: " + temp.getKirjanNumero() + ". " + temp.getKirjanNimi() + "?");
        builder.setPositiveButton("Vahvista",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        deleteTaskukirja(temp);
                    }
                });
        builder.setNegativeButton("Peruuta", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void confirmDeleteAll(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setCancelable(true);
        builder.setTitle("Vahvista kirjojen poisto");
        builder.setMessage("Oletko varma, että haluat poistaa kaikki taskukirjat?");
        builder.setPositiveButton("Vahvista",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        deleteAll();
                    }
                });
        builder.setNegativeButton("Peruuta", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void deleteAll() {
        taskukirjaReference = mFirestore.collection("taskarit");
        for (Taskukirja t : omatTaskukirjat) {
            Log.d(TAG, "käsittelyssä: " + t.getKirjanNumero()+ " käyttäjältä: " + mAuth.getUid());
                taskukirjaReference.document(t.getKirjanNumero().toString() + mAuth.getUid()).delete().addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void unused) {
                        Log.d("softa: ", "Document poistettu.");
                        omatTaskukirjat.remove(t);
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.d("softa: ", "Documenttia ei saatu poistettua." +e.getMessage());
                    }
                });
            }
    }

    public void deleteTaskukirja(Taskukirja tk) {
        taskukirjaReference = mFirestore.collection("taskarit");
        taskukirjaReference.document(tk.getKirjanNumero().toString() + mAuth.getUid())
                .delete().addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void unused) {
                Log.d("softa: ", "Document poistettu.");
                omatTaskukirjat.remove(tk);
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Log.d("softa: ", "Documenttia ei saatu poistetttua.");
            }
        });
    }

    Taskukirja findTaskukirja(Integer kirjanNumero) {
        for (Taskukirja t : omatTaskukirjat) {
            if (t.getKirjanNumero().equals(kirjanNumero)) {
                return t;
            }
        }
        return null;
    }

    public boolean addTaskukirja(Taskukirja taskukirja) {
        taskukirjaReference = mFirestore.collection("taskarit");
        Taskukirja uusi = findTaskukirja(taskukirja.getKirjanNumero());
        if (uusi != null)
        {
            return false;
        }
        Log.d("softa: ", "Insert tapahtui");
        taskukirjaReference.document(taskukirja.getKirjanNumero().toString() + mAuth.getUid()).set(taskukirja);
        return true;
    }

    @SuppressLint("NotifyDataSetChanged")
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == NEW_WORD_ACTIVITY_REQUEST_CODE && resultCode == RESULT_OK) {
            String word = data.getStringExtra(NewTaskukirjaActivity.EXTRA_REPLY);

            String[] splited = word.split(";");
            Integer nro = Integer.parseInt(splited[0]);
            String nimi = splited[1];
            String painos = splited[2];
            String saatu = splited[3];
            Taskukirja taskukirja = new Taskukirja();
            taskukirja.setKirjanNumero(nro);
            taskukirja.setKirjanNimi(nimi);
            taskukirja.setKirjanPainos(painos);
            taskukirja.setKirjanSaamispv(saatu);
            taskukirja.setuID(mAuth.getUid());
            if (!addTaskukirja(taskukirja)) {
                Toast.makeText(
                        getApplicationContext(),
                        "Taskukirja numerolla " + taskukirja.getKirjanNumero() + " on jo lisätty",
                        Toast.LENGTH_LONG).show();
            }
        }
    }

    public void tyhjenna() {
        EditText numeroET = findViewById(R.id.editTextPoistettavanNumero);
        numeroET.setText("");
    }

    @Override
    protected void onStart() {
        super.onStart();
        FirebaseUser user = mAuth.getCurrentUser();
        if (user == null) {
            startActivity(new Intent(context, LoginActivity.class));
        }
        else {
            muutosKysely();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        signOut(true);
    }
}