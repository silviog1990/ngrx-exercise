import { createReducer, on } from '@ngrx/store';
import { UIActions } from '../ui-types';
import { Course } from '../../../features/courses/models/course';

export interface UIState {
  sidebarIsOpen: boolean;
  editDialog: { courseSelected: Course; isOpen: boolean };
  addDialog: { isOpen: boolean };
}

export const initialUIState: UIState = {
  sidebarIsOpen: false,
  editDialog: { courseSelected: undefined, isOpen: false },
  addDialog: { isOpen: true }
};

export const uiReducer = createReducer(
  initialUIState,
  on(UIActions.openSidebar, (state, action) => {
    return { ...state, sidebarIsOpen: true };
  }),
  on(UIActions.closeSidebar, (state, action) => {
    return { ...state, sidebarIsOpen: false };
  })
);
