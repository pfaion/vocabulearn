#pragma once

#include <QMainWindow>
#include <QStackedWidget>

#include "courseview.h"

class MainWindow : public QMainWindow {

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    QStackedWidget *centralStack;
    CourseView *courseView;

};
