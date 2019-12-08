import { User } from '../../models/user.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth.actions';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = { user: undefined };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { ...state, user: action.user };
  }),
  on(AuthActions.logout, (state, action) => {
    return { ...state, user: undefined };
  })
);
