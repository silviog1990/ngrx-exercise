import { createAction, props } from '@ngrx/store';

export const openEditDialog = createAction('[UI] Open Edit Dialog');

export const closeEditDialog = createAction('[UI] Close Edit Dialog');

export const openAddDialog = createAction(
  '[UI] Open Add Dialog',
  props<{ data: any }>()
);

export const closeAddDialog = createAction('[UI] Close Add Dialog');
