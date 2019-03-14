import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationService {

    constructor(
        private http: HttpClient
    ) { }

    getAllLocations() {
        return this.http.get(environment.serverUrl + '/locations');
    }

    createLocation = (location) => {
        return this.http.post(environment.serverUrl + '/location', location);
    }    

    getLocation = (id) => {
        return this.http.get(environment.serverUrl + '/location/locationId/' + id);
    }

    editLocation = (location) => {
        return this.http.post(environment.serverUrl + '/location/edit', location);
    }

    deleteLocation = (location) => {
        return this.http.delete(environment.serverUrl + '/location/locationId/' + location._id);
    }
}