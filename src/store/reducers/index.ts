import { compose } from '@ngrx/core/compose';
import { combineReducers, ActionReducer, Action } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromUsers from './users';

import * as _ from 'lodash';

export interface State {
    users: fromUsers.State,
};

export const initialState: State = {
    users: fromUsers.initialState,
};

const reducers = {
    users: fromUsers.reducer,
};

function applyDefaultState(reducer: ActionReducer<State>): ActionReducer<State> {
    const INITIAL_STATE = '@ngrx/store/init';

    return (state: State, action: Action): State => {
        if (action.type == INITIAL_STATE)
            state = _.merge({}, initialState, state);

        return reducer(state, action);
    };
}

const withLocalStorage = localStorageSync([
    { users: ["users"] },
], true);

const devReducer: ActionReducer<State> = compose(withLocalStorage, applyDefaultState, storeFreeze, combineReducers)(reducers);
const prodReducer: ActionReducer<State> = compose(withLocalStorage, applyDefaultState, combineReducers)(reducers);

export function reducer(state: State, action: any) {
    const production = false;

    if (production)
        return prodReducer(state, action);
    else
        return devReducer(state, action);
}