import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { EditCourseDialogComponent } from '../components/edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../../../shared/functions/default-dialog-config';
import { MatDialog } from '@angular/material';
import { UIActions } from './ui-types';

@Injectable()
export class UIEffects {
  openAddDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UIActions.openAddDialog),
        tap(action => {
          const dialogConfig = defaultDialogConfig();
          dialogConfig.data = action.data;
          this.dialog.open(EditCourseDialogComponent, dialogConfig);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private dialog: MatDialog) {}
}
