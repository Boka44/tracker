import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RedirectService {

    constructor(
        private _router: Router
    ) { }

    redirectBasedOnRoles() {
        // let role = localStorage.getItem('userRole');

        // if (role === 'webAdmin') {
        //     this._router.navigateByUrl('/reports');
        // } else if (role === 'supervisor') {
        //     this._router.navigateByUrl('/dashboard');
        // } else if (role === 'rbaAdmin') {
        //     this._router.navigateByUrl('/teamsList');
        // } else if (role === 'manager') {
        //     this._router.navigateByUrl('/dashboard');
        // } else if (role === 'seniorManager') {
        //     this._router.navigateByUrl('/dashboard');
        // } else {
            this._router.navigateByUrl('/miners');
        // }
    }

}