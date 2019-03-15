import { Component, OnInit } from '@angular/core';
import { RedirectService } from './redirect.service';

@Component({
    selector: 'redirect',
    template: ``
})

export class RedirectComponent implements OnInit {

    constructor(
        private _redirectService: RedirectService
    ) { }

    ngOnInit(): void {
        this._redirectService.redirectBasedOnRoles();
    }
}
