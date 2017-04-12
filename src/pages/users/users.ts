import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/first';
import { Subscription } from "rxjs/Subscription";

import { Store } from "@ngrx/store";
import { State, AsyncOperation } from "./../../store";
import { User } from './../../store/models';
import * as selectors from './../../store/selectors';
import * as actionsUsers from './../../store/actions/users';

@Component({
    selector: 'page-users',
    templateUrl: 'users.html'
})
export class UsersPage implements OnInit, OnDestroy {

    public users$: Observable<User[]>;
    public usersLoadingOp$: Observable<AsyncOperation>;

    private subscriptions: Subscription = new Subscription();

    constructor(
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private store: Store<State>) {

        this.users$ = store.select(selectors.getUsers);
        this.usersLoadingOp$ = store.select(selectors.getUsersLoadingOp);

        this.alertIfLoadingFails();
    }

    ngOnInit() {
        this.refreshForce();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    refreshForce() {
        this.store.dispatch(new actionsUsers.LoadUsersAction());
    }

    refresh() {
        this.store.dispatch(new actionsUsers.LoadUsersWithCheckAction());
    }

    private alertIfLoadingFails() {
        this.subscriptions.add(this.store.select(selectors.getUsersLoadingOp)
            .filter(op => op.fail).subscribe(op => {
                if (op.fail) {
                    this.alertCtrl.create({
                        title: "Loading Users Failed",
                        message: op.message,
                        buttons: ['OK'],
                    }).present();
                }
            }));
    }
}
