import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// import { CapabilityEngineService } from '../capabilityEngine.service';
// import { LandingService } from './landing.service';
// import { RedirectService } from '../redirect/redirect.service';
// import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    // isSupervisor: Boolean = false;
    // isManager: Boolean = false;
    // isSeniorManager: Boolean = false;
    // isAdmin: Boolean = false;
    // isRbaSales: Boolean = false;
    teamName: string;
    userRole: string;
    currentPage: string;
    pageTitle: string;

    constructor(
        private _router: Router, private _route: ActivatedRoute
        // private _capabilityEngineService: CapabilityEngineService,
        // private _landingService: LandingService,
        // private _redirectService: RedirectService,
        // private _cookieService: CookieService
    ) {
        this._router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this._route)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => {
                this.currentPage = event.currentPage;
                this.pageTitle = _.startCase(event.currentPage);
            });
    }


    ngOnInit() {

        // this.teamName = localStorage.getItem('teamName');
        // this.userRole = localStorage.getItem('userRole');

        // if (this.userRole === 'supervisor') {
        //     this.isSupervisor = true;
        // }
        // if (this.userRole === 'manager') {
        //     this.isManager = true;
        // }
        // if (this.userRole === 'seniorManager') {
        //     this.isSeniorManager = true;
        // }
        // if (this.userRole === 'webAdmin') {
        //     this.isAdmin = true;
        // }
        // if (this.userRole === 'rbaAdmin') {
        //     this.isRbaSales = true;
        // }
    }
    // canPerform(data) {
    //     return this._capabilityEngineService.canPerform(data);
    // }

    // logout() {
    //     localStorage.clear();
    //     this._cookieService.delete('x-header-authtoken');
    //     this._cookieService.delete('x-header-refreshtoken');
    //     this.isSupervisor = false;
    //     this.isManager = false;
    //     this.isSeniorManager = false;
    //     this.isAdmin = false;
    //     this.isRbaSales = false;
    //     this._router.navigateByUrl('/login');
    //     return this._landingService.logout()
    //         .subscribe((res) => {
    //             console.log(res);
    //             localStorage.clear();
    //             this._cookieService.delete('x-header-authtoken');
    //             this._cookieService.delete('x-header-refreshtoken');
                
    //             this.isSupervisor = false;
    //             this.isAdmin = false;
    //             this.isRbaSales = false;
    //             this._capabilityEngineService.clearCapabilities();
    //             this._router.navigateByUrl('/login');
    //         }, (err) => {
    //             console.log(err);
    //         });
    // }

}