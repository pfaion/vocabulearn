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
import {CourseService} from "../entities/course.service";
import {FormsModule} from "@angular/forms";

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
            { path: 'course/:key', component: CourseDetailsComponent },
            { path: 'addCourse', component: CourseDetailsComponent }
        ])
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CoursesComponent,
        CourseDetailsComponent
    ],
    providers: [CourseService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
