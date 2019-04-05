import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LogsService {

    constructor(
        private http: HttpClient
    ) { }

    getLogs = (page, filter) => {
        if(filter) {
            return this.http.get(environment.serverUrl + '/logs/' + page + `?filter=${filter}`);
        }
        return this.http.get(environment.serverUrl + '/logs/' + page);
    }

}