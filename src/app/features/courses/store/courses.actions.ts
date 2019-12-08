import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course';

export const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses'
);

export const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ course: Course }>()
);
