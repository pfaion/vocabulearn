
import {Injectable} from "@angular/core";
import {Course} from "./course";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

@Injectable()
export class CourseService {

    constructor(
        private db: AngularFireDatabase
    ){}

    getCourses(): FirebaseListObservable<Course[]> {
        const ref = `/courses`;
        return this.db.list(ref);
    }

    getCourse(key: string) : Observable<Course> {
        const ref = `/courses/${key}`;
        return this.db.object(ref);
    }

    update(course: Course): void {
        const ref = `/courses/${course.$key}`;
        this.db.object(ref).update(course);
    }

    add(course: Course): void {
        const course_ref = `/courses`;
        this.db.list(course_ref).push(course);
    }

    delete(course: Course): void {
        const ref = `/courses/${course.$key}`;
        this.db.object(ref).remove();
    }
}