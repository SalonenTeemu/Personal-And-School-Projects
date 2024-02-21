/*
 * Peli 2048
 *
 * Kuvaus:
 * Ohjelma toimii pelinä 2048. Sen toiminnallisuus on toteutettu
 * luokkien Gameboard ja Numbertile avulla. Luokassa Mainwindow on toteutettu
 * peliin liittyvä graafinen käyttöliittymä. Ohjelmalla on lisäksi
 * resurssikansio Resources, jossa on kuvatiedostoja graafista käyttöliittymää
 * varten. Tiivistettynä pelin idea on se, että käyttäjä valitsee voittoarvon,
 * joka on default arvona juurikin 2048. Käyttäjän liikuttaa ruutuja ja kahden
 * saman arvoisen ruuden yhdistyessä niiden arvo kaksinkertaistuu. Jokaisella
 * siirrolla tulee yksi arvo pelilaudalle enemmän. Käyttäjän tulee yhdistellä
 * ruutuja siten, että hän saavuttaa voittoarvon. Hän häviää jos pelilauta
 * täyttyy ruuduista. Tiedostossa instructions.txt on selitetty pelin toiminta
 * tarkemmin, sekä selitetty eri toiminnallisuudet ja lisäykset peliin.
 */

#include "mainwindow.hh"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    w.show();
    return a.exec();
}
