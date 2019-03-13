import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class LogService {

    constructor(
        private http: HttpClient
    ) { }

    generateLog = (type, message, oldObj, newObj) => {
        console.log('Generating Log')
        if(!oldObj && !newObj) {
            // handle non update logs here
            let logObj = {
                loggedObj: {},
                logType: type,
                message: message
            }
    
            console.log(logObj)
    
            return this.createLog(logObj);
        }

        let logObj = {
            loggedObj: {
                preUpdate: oldObj,
                postUpdate: newObj
            },
            logType: type
        }

        console.log(logObj)

        return this.createLog(logObj);
    }

    createLog = (log) => {
        return this.http.post(environment.serverUrl + '/log', log);
    }    
}