import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';

import { BaseService } from "./../core/base.service";

import { User } from './../store/models';

@Injectable()
export class FakeDataService extends BaseService {

    private baseUrl = "https://jsonplaceholder.typicode.com";
    private usersUrl = this.baseUrl + "/users";

    private getUsersCallCount = 0;

    constructor(
        http: Http
    ) {
        super(http);
    }

    getUsers(): Observable<User[]> {
        this.getUsersCallCount++;

        if (this.getUsersCallCount % 5 == 0) {
            return Observable.throw(new Error("Ooops, this is exception is thrown once in 5 requests")).delay(1000);
        }

        return this.get<User[]>(this.usersUrl).delay(1000);
    }
}