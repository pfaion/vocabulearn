#include "mainwindow.h"
#include <QApplication>
#include <QSqlDatabase>


int main(int argc, char *argv[])
{
    QString dbLocation = "/Users/pfaion/git/vocabulearn/desktop_app/project/db.sqlite";
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
    db.setDatabaseName(dbLocation);
    db.open();

    QApplication a(argc, argv);
    MainWindow w;
    w.show();

    return a.exec();
}
