import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './reducers/courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(
  'courses'
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  courses => courses.courses ? courses.courses : []
);

export const selectBeginnerCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const selectAllCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
