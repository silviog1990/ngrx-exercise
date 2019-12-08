import { createReducer, on } from '@ngrx/store';
import { initialUIState } from '../../../../core/store/reducers/ui.reducer';
import { UIActions } from '../ui-types';

export const uiReducer = createReducer(
  initialUIState,
  on(UIActions.openAddDialog, (state, action) => {
    return { ...state, addDialog: { isOpen: true } };
  }),
  on(UIActions.closeAddDialog, (state, action) => {
    return { ...state, addDialog: { isOpen: false } };
  })
);
