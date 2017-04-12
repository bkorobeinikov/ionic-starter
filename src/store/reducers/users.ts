import * as actionsUsers from './../actions/users';
import { AsyncStatus, AsyncOperation, defaultAsyncOp, makeAsyncOp } from './../utils';
import { User } from './../models';

import * as _ from 'lodash';

export interface State {

    users: { [userId: number]: User };
    usersLoadingOp: AsyncOperation;

}

export const initialState: State = {
    users: {},
    usersLoadingOp: defaultAsyncOp(),
};

export function reducer(state: State = initialState, actionRaw: actionsUsers.Actions): State {
    switch (actionRaw.type) {
        case actionsUsers.ActionTypes.LOAD_USERS: {
            
            return {
                ...state,
                usersLoadingOp: makeAsyncOp(AsyncStatus.Pending),
            };
        }
        case actionsUsers.ActionTypes.LOAD_USERS_SUCCESS: {
            let action = <actionsUsers.LoadUsersSuccessAction>actionRaw;
            let users = action.payload.users;

            return {
                ...state,
                users: _.keyBy(users, u => u.id),
                usersLoadingOp: makeAsyncOp(AsyncStatus.Success),
            };
        }
        case actionsUsers.ActionTypes.LOAD_USERS_FAIL: {
            let action = <actionsUsers.LoadUsersFailAction>actionRaw;

            return {
                ...state,
                usersLoadingOp: makeAsyncOp(AsyncStatus.Fail, action.payload.message),
            };
        }
        default: {
            return state;
        }
    }
}

export const getUsersEntities = (state:State) => state.users;
export const getUsersLoadingOp = (state:State) => state.usersLoadingOp;
