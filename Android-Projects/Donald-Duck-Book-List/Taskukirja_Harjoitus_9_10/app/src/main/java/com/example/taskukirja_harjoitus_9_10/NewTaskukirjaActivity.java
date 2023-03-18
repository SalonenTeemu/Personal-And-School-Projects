package com.example.taskukirja_harjoitus_9_10;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class NewTaskukirjaActivity extends AppCompatActivity {
    public static final String EXTRA_REPLY = "com.example.android.roomtesti3112022.REPLY";

    private EditText mEditNumeroView;
    private EditText mEditNimiView;
    private EditText mEditPainosView;
    private EditText mEditSaatuView;
    private FloatingActionButton mFobTakaisin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_taskukirja);

        mEditNumeroView = findViewById(R.id.edit_numero);
        mEditNimiView = findViewById(R.id.edit_nimi);
        mEditPainosView = findViewById(R.id.edit_painos);
        mEditSaatuView = findViewById(R.id.edit_saatu);
        mFobTakaisin = findViewById(R.id.floatingActionButtonPrevious);

        mFobTakaisin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        final Button button = findViewById(R.id.button_save);
        button.setOnClickListener(view -> {
            Intent replyIntent = new Intent();
            if (TextUtils.isEmpty(mEditNumeroView.getText()) || TextUtils.isEmpty(mEditNimiView.getText()) ||
                    TextUtils.isEmpty(mEditPainosView.getText()) || TextUtils.isEmpty(mEditSaatuView.getText())) {
                setResult(RESULT_CANCELED, replyIntent);
                Toast.makeText(
                        getApplicationContext(),
                        "Täytä kaikki ruudut lisätäksesi taskukirjan.",
                        Toast.LENGTH_LONG).show();
            } else {
                String word = mEditNumeroView.getText().toString() + ";" + mEditNimiView.getText().toString()
                        + ";" + mEditPainosView.getText().toString() + ";" + mEditSaatuView.getText().toString();
                replyIntent.putExtra(EXTRA_REPLY, word);
                setResult(RESULT_OK, replyIntent);
                finish();
            }
        });
    }
}