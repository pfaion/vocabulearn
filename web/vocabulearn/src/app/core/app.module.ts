import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {CoursesComponent} from "../courses/courses.component";
import {CourseDetailsComponent} from "../courses/course-details.component";
import {CourseService} from "../courses/course.service";
import {FormsModule} from "@angular/forms";
import {LessonsComponent} from "../lessons/lessons.component";
import {LessonService} from "../lessons/lesson.service";
import {LessonDetailsComponent} from "../lessons/lesson-details.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            { path: 'home', component: HomeComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'course/edit/:key', component: CourseDetailsComponent },
            { path: 'course/add', component: CourseDetailsComponent },
            { path: 'lessons/:courseKey', component: LessonsComponent },
            { path: 'lesson/add/:courseKey', component: LessonDetailsComponent },
            { path: 'lesson/edit/:key', component: LessonDetailsComponent }
        ])
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CoursesComponent,
        CourseDetailsComponent,
        LessonsComponent,
        LessonDetailsComponent
    ],
    providers: [
        CourseService,
        LessonService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
