#pragma once

#include <QWidget>

class CourseView : public QWidget
{
    Q_OBJECT
public:
    explicit CourseView(QWidget *parent = nullptr);

private:
    void initGUI();
};
