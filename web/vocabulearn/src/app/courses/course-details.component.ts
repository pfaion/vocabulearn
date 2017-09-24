import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Course} from "./course";
import {CourseService} from "./course.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    styleUrls: [ './course-details.component.scss' ]
})
export class CourseDetailsComponent implements OnInit{

    course: Course;
    modes = {
        EDIT: 0,
        ADD: 1
    };
    mode;

    constructor(
        private courseService: CourseService,
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
                this.course = new Course();

            } else if(pathList.includes('edit')) {
                this.mode = this.modes.EDIT;
                const courseKey = paramMap.get('key');
                this.courseService.getCourse(courseKey).subscribe(course => {
                    if(!course.$exists()) {
                        this.router.navigateByUrl('/courses');
                    }
                    this.course = course;
                });
            }
        });
    }

    save(): void {
        this.courseService.update(this.course);
        this.goBack();
    }

    add(): void {
        this.courseService.add(this.course);
        this.goBack();
    }

    delete(): void {
        this.courseService.delete(this.course);
        this.goBack();
    }

    goBack(): void {
        this.location.back();
    }


}