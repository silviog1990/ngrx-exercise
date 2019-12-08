import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './reducers/ui.reducer';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectAllUI = createSelector(selectUIState, ui => ui);

export const selectSidebarIsOpen = createSelector(
  selectAllUI,
  ui => ui.sidebarIsOpen
);
