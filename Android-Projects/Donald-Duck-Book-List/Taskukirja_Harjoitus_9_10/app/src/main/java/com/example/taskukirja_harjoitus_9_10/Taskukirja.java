package com.example.taskukirja_harjoitus_9_10;

public class Taskukirja {

    private Integer kirjanNumero;
    private String kirjanNimi;
    private String kirjanPainos;
    private String kirjanSaamispv;
    private String uID;

    public Integer getKirjanNumero() {
        return kirjanNumero;
    }

    public void setKirjanNumero(Integer kirjanNumero) {
        this.kirjanNumero = kirjanNumero;
    }

    public String getKirjanNimi() {
        return kirjanNimi;
    }

    public void setKirjanNimi(String kirjanNimi) {
        this.kirjanNimi = kirjanNimi;
    }

    public String getKirjanPainos() {
        return kirjanPainos;
    }

    public void setKirjanPainos(String kirjanPainos) {
        this.kirjanPainos = kirjanPainos;
    }

    public String getKirjanSaamispv() {
        return kirjanSaamispv;
    }

    public void setKirjanSaamispv(String kirjanSaamispv) {
        this.kirjanSaamispv = kirjanSaamispv;
    }

    public String getuID() {return uID;}

    public void setuID(String uID) {this.uID = uID;}

    @Override
    public String toString() {
        return kirjanNumero+". "+kirjanNimi;
    }

}