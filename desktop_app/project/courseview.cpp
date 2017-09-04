#include "courseview.h"

#include <QVBoxLayout>
#include <QLabel>
#include <QtDebug>
#include <QSqlDatabase>
#include <QSqlQuery>

CourseView::CourseView(QWidget *parent) : QWidget(parent)
{
    initGUI();
}

void CourseView::initGUI()
{

    QVBoxLayout *layout = new QVBoxLayout();
    setLayout(layout);

    auto query = QSqlDatabase::database().exec("SELECT ID, name, language FROM Course");
    qDebug() << query.isActive();
    while(query.next())
    {
        QString name = query.value(1).toString();
        QString language = query.value(2).toString();
        layout->addWidget(new QLabel(name));
    }



}
