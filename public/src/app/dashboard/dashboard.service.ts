import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

    constructor(
        private http: HttpClient
    ) { }

    getAllUsers() {
        return this.http.get(environment.serverUrl + '/users');
    }

    createUser = (user) => {
        return this.http.post(environment.serverUrl + '/user', user);
    }    

    getUser = (id) => {
        return this.http.get(environment.serverUrl + '/user/userId/' + id);
    }

    editUser = (user) => {
        return this.http.post(environment.serverUrl + '/user/edit', user);
    }

    deleteUser = (user) => {
        return this.http.delete(environment.serverUrl + '/user/userId/' + user._id);
    }
}