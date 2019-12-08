import { Component, OnInit } from '@angular/core';
import { Course, compareCourses } from '../../models/course';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import { Store } from '@ngrx/store';
import {
  selectBeginnerCourses,
  selectAdvancedCourses,
  selectPromoTotal
} from '../../store/courses.selectors';
import { map, first } from 'rxjs/operators';
import { UIActions } from '../../store/ui-types';
import { selectAddDialog } from '../../store/ui.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.reload();
    this.store
      .select(selectAddDialog)
      .pipe(map(addDialog => addDialog.isOpen), first())
      .subscribe(isOpen => {
        if (isOpen) {
          this.onAddCourse();
        }
      });
  }

  reload() {
    this.beginnerCourses$ = this.store
      .select(selectBeginnerCourses)
      .pipe(map(courses => courses.sort(compareCourses)));

    this.advancedCourses$ = this.store
      .select(selectAdvancedCourses)
      .pipe(map(courses => courses.sort(compareCourses)));

    this.promoTotal$ = this.store.select(selectPromoTotal);
  }

  onAddCourse() {
    const data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };
    this.store.dispatch(UIActions.openAddDialog({ data }));
  }
}
