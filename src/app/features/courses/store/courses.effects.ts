import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesHttpService } from '../services/courses-http.service';
import { CoursesActions } from './courses-type';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesActions.allCoursesLoaded({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap(action =>
          this.coursesHttpService.saveCourse(action.course.id, action.course)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
