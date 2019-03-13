import { Component, OnInit } from '@angular/core';
import { LogsService } from './logs.service';
import { LogService } from '../log.service';
import* as _ from 'lodash';
import { generate } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(
    private _logsService: LogsService,
    private __logService: LogService
  ) { }

  logs = [];
  page: number = 0;
  type = 'safety';
  message;

  ngOnInit() {
    this.page = 0;
    this._logsService.getLogs(this.page)
      .subscribe((result: any) => {
        this.logs = result.data;
        this.page++;
      }, (err) => {
        console.log(err);
      })
  }

  onScroll() {
    this._logsService.getLogs(this.page)      
      .subscribe((result: any) => {
        let newLogs = _.union(this.logs, (result.data));
        this.logs = newLogs;
        this.page++
      })
  }

  addLog() {
    console.log(this.type);
    console.log(this.message)
    this.__logService.generateLog(this.type, this.message, false, false)
      .subscribe((result: any) => {
        console.log(result);
        this.type = 'safety';
        this.message = "";
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      })
  }

}
