import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {
    // non è il tipico modo di creare un side effect dato che non ho gestione degli errori
    // e non sono type safe, infatti devo specificare usr tra le quadre perché il compilatore
    // non sa che tipo ha il payload della action
    // actions$.subscribe(action => {
    //   if (action.type === '[Login Page] User Login') {
    //     localStorage.setItem('user', JSON.stringify(action['user']));
    //   }
    // });
  }
}
