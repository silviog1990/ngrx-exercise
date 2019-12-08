import { selectAllUI } from '../../../core/store/ui.selectors';
import { createSelector } from '@ngrx/store';

export const selectAddDialog = createSelector(
  selectAllUI,
  ui => ui.addDialog
);
