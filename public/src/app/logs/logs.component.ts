import { Component, OnInit } from '@angular/core';
import { LogsService } from './logs.service';
import { LogService } from '../log.service';
import* as _ from 'lodash';
import { generate } from 'rxjs';
import { Logs } from 'selenium-webdriver';
import { filter } from 'rxjs/operator/filter';

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

  logs = [ ];
  page: number = 0;
  type = 'safety';
  message;
  filter: String = 'none';

  ngOnInit() {
    this.page = 0;
    this._logsService.getLogs(this.page, false)
      .subscribe((result: any) => {
        let reversed = result.data.reverse();
        this.logs = reversed;
        // this.logs.reverse();
        
        console.log(this.logs)
        this.page++;
      }, (err) => {
        console.log(err);
      })
  }

  onScroll() {
    if(this.filter === 'none') {
      this._logsService.getLogs(this.page, false)      
        .subscribe((result: any) => {
          let newLogs = _.union(this.logs.reverse(), (result.data));
          this.logs = newLogs.reverse();
          this.page++;
        });
    } else {
      this._logsService.getLogs(this.page, this.filter)      
        .subscribe((result: any) => {
          let newLogs = _.union(this.logs.reverse(), (result.data));
          this.logs = newLogs.reverse();
          this.page++;
        });
    }
    
  }

  addLog() {
    console.log(this.type);
    console.log(this.message)
    if(this.message === "") {
      this.message = "Must include message";
      return;
    }
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

  selectType(type) {
    this.type = type;
    console.log(type)
  }

  selectFilter(filter) {
    this.filter = filter;
    this.page = 0;
    if(filter === 'none') {
      this.ngOnInit();
    } else {
       this._logsService.getLogs(this.page, this.filter)
        .subscribe((result: any) => {
          let reversed = result.data.reverse();
          this.logs = reversed;
          // this.logs.reverse();
          
          console.log(this.logs)
          this.page++;
        }, (err) => {
          console.log(err);
        })
    }
   
  }

}
