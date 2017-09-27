
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Lesson} from "./lesson";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/observable/combineLatest";


@Injectable()
export class LessonService {

    constructor(
        private db: AngularFireDatabase
    ){
    }

    getLessons(courseKey: string): Observable<Lesson[]> {
        const lessons_ref = `/courses/${courseKey}/lessons`;
        return this.db.list(lessons_ref)
            .switchMap(lessons => {
                return Observable.combineLatest(
                    lessons.map(lesson => {
                        return this.db.object(`/lessons/${lesson.$key}`);
                    })
                );
            });
    }

    getLesson(lessonKey: string): Observable<Lesson> {
        const ref = `/lessons/${lessonKey}`;
        return this.db.object(ref);
    }

    update(lesson: Lesson): void {
        const ref = `/lessons/${lesson.$key}`;
        this.db.object(ref).update(lesson);
    }

    add(lesson: Lesson): void {
        const lesson_ref = `/lessons`;
        let newKey = this.db.list(lesson_ref).push(lesson).key;
        const courseIndex = `/courses/${lesson.courseKey}/lessons/`;
        this.db.list(courseIndex).set(newKey, true);
    }

    delete(lesson: Lesson): void {
        const ref = `/lessons/${lesson.$key}`;
        this.db.object(ref).remove();
        const courseIndex = `/courses/${lesson.courseKey}/lessons/`;
        this.db.list(courseIndex).set(lesson.$key, null);
    }
}