import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: [ './courses.component.scss' ]
})
export class CoursesComponent {
    courseList: FirebaseListObservable<any>;

    constructor(
        private db: AngularFireDatabase
    ) {
        this.courseList = db.list('/courses');
    }

}