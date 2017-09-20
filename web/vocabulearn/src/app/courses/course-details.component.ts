import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Course} from "../entities/course";
import {CourseService} from "../entities/course.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";


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
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.courseService.getCourse(params.get('key')))
            .subscribe(
                course => {
                    this.course = course;
                    this.mode = this.modes.EDIT;
                },
                err => {
                    this.course = new Course();
                    this.mode = this.modes.ADD;
                }
            );
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