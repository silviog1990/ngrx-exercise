import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { CoursesActions } from '../store/courses-type';
import { selectAllCoursesLoaded } from '../store/courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAllCoursesLoaded),
      tap((allCoursesAreLoaded) => {
        if (!this.loading && !allCoursesAreLoaded) {
          this.loading = true;
          this.store.dispatch(CoursesActions.loadAllCourses());
        }
      }),
      filter(allCoursesAreLoaded => allCoursesAreLoaded), // mi serve perché altrimenti emetto valore anche quando non è true il flag
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
