import {Component} from '@angular/core';
import {CourseService} from "./course.service";
import {Course} from "./course";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: [ './courses.component.scss' ]
})
export class CoursesComponent {
    courseList: Course[];

    constructor(
        private courseService: CourseService
    ) {
        this.getCourses();
    }


    private getCourses(): void {
        this.courseService.getCourses().subscribe(courses => this.courseList = courses);
    }

}