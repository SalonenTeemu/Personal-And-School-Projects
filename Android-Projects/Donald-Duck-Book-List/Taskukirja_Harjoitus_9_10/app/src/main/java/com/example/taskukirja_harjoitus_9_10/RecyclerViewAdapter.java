package com.example.taskukirja_harjoitus_9_10;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;


public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

    private ArrayList<Taskukirja> mData;
    private LayoutInflater mInflater;
    private ItemClickListener mClickListener;
    private Taskukirja tk;

    RecyclerViewAdapter(Context context, ArrayList<Taskukirja> data) {
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
        this.tk = null;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.recyclerview_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Taskukirja current = mData.get(position);
        tk = current;

        String nro = String.valueOf((current.getKirjanNumero()));
        String nimi = current.getKirjanNimi();
        String painos = current.getKirjanPainos();
        String saatu = current.getKirjanSaamispv();
        Log.d("TaskukirjaViewHolder", "Arvot: " + nro + " " + nimi + " " + painos + " " + saatu);

        holder.textViewNumero.setText(nro);
        holder.textViewNimi.setText(nimi);
        holder.textViewPainos.setText(painos);
        holder.textViewSaatu.setText(saatu);
    }

    @Override
    public int getItemCount() {
        return mData.size();
    }

    Taskukirja getTaskukirja() {
        return tk;
    }

    Taskukirja getItem(int position) {
        Log.d("softa: mData: ", mData.toString());
        return mData.get(position);
    }

    void setClickListener(ItemClickListener itemClickListener) {
        this.mClickListener = itemClickListener;
    }

    public interface ItemClickListener {
        void onItemClick(View view, int position);
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView textViewNumero;
        TextView textViewNimi;
        TextView textViewPainos;
        TextView textViewSaatu;

        ViewHolder(View itemView) {
            super(itemView);
            textViewNumero = itemView.findViewById(R.id.textViewNro);
            textViewNimi = itemView.findViewById(R.id.textViewNimi);
            textViewPainos = itemView.findViewById(R.id.textViewPainos);
            textViewSaatu = itemView.findViewById(R.id.textViewSaatu);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            if (mClickListener != null) {
                mClickListener.onItemClick(view, getAdapterPosition());
                Taskukirja current = getItem(getAdapterPosition());
                tk = current;
            }
        }
    }
}
