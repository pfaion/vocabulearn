#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent)
{
    resize(800, 500);

    centralStack = new QStackedWidget();
    setCentralWidget(centralStack);

    courseView = new CourseView();
    centralStack->addWidget(courseView);
}

MainWindow::~MainWindow()
{

}
