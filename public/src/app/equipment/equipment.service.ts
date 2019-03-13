import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EquipmentService {

    constructor(
        private http: HttpClient
    ) { }

    getAllEquipments() {
        return this.http.get(environment.serverUrl + '/equipments');
    }

    createEquipment = (equipment) => {
        return this.http.post(environment.serverUrl + '/equipment', equipment);
    }    

    getEquipment = (id) => {
        return this.http.get(environment.serverUrl + '/equipment/equipmentId/' + id);
    }

    editEquipment = (equipment) => {
        return this.http.post(environment.serverUrl + '/equipment/edit', equipment);
    }

    deleteEquipment = (equipment) => {
        return this.http.delete(environment.serverUrl + '/equipment/equipmentId/' + equipment._id);
    }
}