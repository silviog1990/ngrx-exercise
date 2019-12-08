import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state in metareducer logger: ', state);
    console.log('action in metareducer logger: ', action);
    return reducer(state, action);
  };
}

// vengono eseguiti prima del reducer invocato da noi
// l'ordine nell'array conta poiché è l'ordine della catena dei reducer invocati
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [/*logger*/]
  : [];
