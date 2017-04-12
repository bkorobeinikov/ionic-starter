import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from '@ngrx/effects';

import { State } from './../reducers';
import * as actionsUsers from './../actions/users';
import * as selectors from './../selectors';

import { FakeDataService } from "../../services/fakedata.service";

import moment from 'moment';

@Injectable()
export class UsersEffects {

    @Effect()
    loadWithCheck: Observable<Action> = this.actions$
        .ofType(actionsUsers.ActionTypes.LOAD_USERS_WITH_CHECK)
        .withLatestFrom(this.store.select(selectors.getUsersLoadingOp))
        .filter(([actionRaw, loadingOp]) => {
            // if there was no loading or last load succeeded more than 5 minutes ago
            return loadingOp == null || loadingOp.fail || moment(loadingOp.completedAt).isBefore(moment().subtract(5, "minutes"));
        }).map(() => new actionsUsers.LoadUsersAction());

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(actionsUsers.ActionTypes.LOAD_USERS)
        .switchMap(actionRaw => {
            return this.fakeDataService.getUsers()
                .map(res => {
                    return new actionsUsers.LoadUsersSuccessAction({ users: res });
                })
                .catch((res: Error) => {
                    return of(new actionsUsers.LoadUsersFailAction({ message: res.message }));
                });
        });

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private fakeDataService: FakeDataService) { }
}