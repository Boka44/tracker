import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';


@Pipe({
    name: 'global'
})

// @Injectable()
// export class GlobalService {
//     pageTitle: String = 'FormHound';
// }


export class GlobalService implements PipeTransform, OnInit {

    constructor(private _titleService: Title, private router: Router) { }

    transform(value: any): object {
        return { BASE_API_URL: this._titleService.getTitle() };
    }

    ngOnInit() {
        this.router.events.subscribe((events) => {
            if (events instanceof NavigationStart) {
                console.log(events);
            }
        });
    }
}
