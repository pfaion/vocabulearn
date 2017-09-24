import {Component, OnInit} from '@angular/core';
import {Lesson} from "./lesson";
import {LessonService} from "./lesson.service";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../courses/course.service";
import {Course} from "../courses/course";

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: [ './lessons.component.scss' ]
})
export class LessonsComponent implements OnInit{

    course: Course;
    lessonList: Lesson[];

    constructor(
        private lessonService: LessonService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {

            // parameter courseKey from route
            let courseKey = params.get('courseKey');

            // subscribe to lesson list
            this.lessonService.getLessons(courseKey)
                .subscribe(list => {
                    this.lessonList = list;
                });

            // subscribe to course title
            this.courseService.getCourse(courseKey)
                .subscribe(course => {
                    this.course = course;
                });
        });

    }



}