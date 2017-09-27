import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {Lesson} from "./lesson";
import {LessonService} from "./lesson.service";


@Component({
    selector: 'lesson-details',
    templateUrl: './lesson-details.component.html',
    styleUrls: [ './lesson-details.component.scss' ]
})
export class LessonDetailsComponent implements OnInit{

    lesson: Lesson;
    modes = {
        EDIT: 0,
        ADD: 1
    };
    mode;

    constructor(
        private lessonService: LessonService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {

        Observable.combineLatest(this.route.paramMap, this.route.url).subscribe(latestValues => {
            const [paramMap, url] = latestValues;
            let pathList = url.map(segment => segment.path);

            if(pathList.includes('add')) {
                this.mode = this.modes.ADD;
                this.lesson = new Lesson();
                this.lesson.courseKey= paramMap.get('courseKey');
            } else if(pathList.includes('edit')) {
                this.mode = this.modes.EDIT;
                const lessonKey = paramMap.get('key');
                this.lessonService.getLesson(lessonKey).subscribe(lesson => {
                    if(!lesson.$exists()) {
                        this.goBack();
                    }
                    this.lesson = lesson;
                });
            }
        });
    }

    save(): void {
        this.lessonService.update(this.lesson);
        this.goBack();
    }

    add(): void {
        this.lessonService.add(this.lesson);
        this.goBack();
    }

    delete(): void {
        this.lessonService.delete(this.lesson);
        this.goBack();
    }

    goBack(): void {
        this.location.back();
    }


}