import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LogsService {

    constructor(
        private http: HttpClient
    ) { }

    getLogs = (page) => {
        return this.http.get(environment.serverUrl + '/logs/' + page);
    }

}