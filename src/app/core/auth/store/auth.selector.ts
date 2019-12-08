import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './reducers/auth.reducer';

// creao feature selector per essere type safe
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// in questo modo viene già effettuata la memoization cioè viene memorizzato l'ultimo valore fornito dalla funzione
// che in quanto pura, per lo stesso input fornirà sempre lo stesso output in modo da non dover fare nuove elaborazioni
export const isLoggedIn = createSelector(
  // disabilitato in quanto ho fatto il mapping con il feature selector
  // in modo da essere type safe e avere gli attributi dell'oggetto auth
  // state => state['auth'],
  selectAuthState,
  auth => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, isLogged => !isLogged);
