import { createSelector } from 'reselect';

import { State } from './../reducers';
import * as fromUsers from './../reducers/users';

import * as _ from 'lodash';

// users state
const getUsersState = (state: State) => state.users;

export const getUsersEntities = createSelector(getUsersState, fromUsers.getUsersEntities);
export const getUsers = createSelector(getUsersEntities, (entities) => _.values(entities));
export const getUsersLoadingOp = createSelector(getUsersState, fromUsers.getUsersLoadingOp);