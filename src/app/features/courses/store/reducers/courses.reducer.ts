import { createReducer, on } from '@ngrx/store';
import { CoursesActions } from '../courses-type';
import { Course } from '../../models/course';

export interface CoursesState {
  courses: Course[];
  allCoursesLoaded: boolean;
}

export const initialCoursesState: CoursesState = {
  courses: undefined,
  allCoursesLoaded: false
};

export const coursesReducer = createReducer(
  initialCoursesState,
  // l'azione loadAllCourses non ha bisogno di reducer perché non interagisce con lo store
  on(CoursesActions.allCoursesLoaded, (state, action) => {
    return { ...state, allCoursesLoaded: true, courses: action.courses };
  }),
  on(
    CoursesActions.courseUpdated,
    (state, action) => {
      const updatedCourse = action.course;
      const courses = [...state.courses];
      const index = courses.findIndex(course => course.id === updatedCourse.id);
      courses[index] = updatedCourse;
      return { ...state, courses };
    }
  )
);
