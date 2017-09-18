import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
    selector: 'app-root',
    template: `
        <h1>Vocabulearn</h1>
        <ul>
            <li *ngFor="let item of items | async">
                {{ item.title }}
            </li>
        </ul>
    `,
    styles: []
})
export class AppComponent {
    title = 'app';

    items: FirebaseListObservable<any[]>;

    constructor(db: AngularFireDatabase) {
        this.items = db.list('/courses')
    }
}
