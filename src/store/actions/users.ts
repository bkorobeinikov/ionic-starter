import { Action } from '@ngrx/store';
import { type } from './../utils';

import { User } from './../models';

export const ActionTypes = {
    LOAD_USERS_WITH_CHECK: type("[Users] Load Users With Check"),
    LOAD_USERS: type("[Users] Load Users"),
    LOAD_USERS_SUCCESS: type("[Users] Load Users Success"),
    LOAD_USERS_FAIL: type("[Users] Load Users Fail"),
}

export class LoadUsersWithCheckAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_WITH_CHECK;

    constructor() { }
}

export class LoadUsersAction implements Action {
    readonly type = ActionTypes.LOAD_USERS;

    constructor() { }
}

export class LoadUsersSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_SUCCESS;

    constructor(public payload: { users: User[] }) { }
}

export class LoadUsersFailAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_FAIL;

    constructor(public payload: { message: string }) { }
}

export type Actions
    = LoadUsersAction
    | LoadUsersSuccessAction
    | LoadUsersFailAction;