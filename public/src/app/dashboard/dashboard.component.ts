import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { DashboardService } from './dashboard.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { LogService } from '../log.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _dashboardService: DashboardService,
    private __logService: LogService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  userList = [];

  working = [];
  lunch = [];
  pool = [];

  userObj = {
    name: '',
    email: '',
    password: '',
    status: '',
    role: '',
    notes: ''
  }

  currentUser: any = {
    name: '',
    email: '',
    role: '',
    notes: ''
  };

  isVisible: Boolean = false;


  options: SortablejsOptions = {
    group: 'users',
    onAdd: (evt) => {
      var itemEl = evt.item;
      console.log(evt)

      let status = evt.to.id;
      let oldStatus = evt.from.id;
      let itemId = evt.item.id;
      console.log(itemId)
      console.log("To " + status + " from " + oldStatus);

      // console.log(this)

      this.updateUser(itemId, status);
      // let _id = evt.item.id;
      // let index = listItems.findIndex(i => i._id == _id);
      // listItems[index].status = status;

      // let d = new Date();
      // var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      //     d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + ("0" + d.getSecon  ds()).slice(-2) + "s";

      // itemEl.querySelector("#updatedAt").innerHTML = "<strong>Last Updated</strong>: " + datestring;

      // generateLogs(listItems[index], status, oldStatus, datestring);
      // console.log(logs);
    }
  }

  // generate logs function
  
  // get users function
  getUsers() {
    this.working = [];
    this.lunch = [];
    this.pool = [];
    this._dashboardService.getAllUsers()
      .subscribe((result: any) => {
        console.log(result)
        this.userList = result.data;
        this.sortList(result.data);
      })
  }

  sortList(users) {
    users.forEach((user) => {
      user.updatedAt = moment(user.updatedAt).format('MM/DD/YYYY h:mm:ss a');
      if(user.status === 'working') {
        this.working.push(user)
      }
      if(user.status === 'lunch') {
        this.lunch.push(user)
      }
      if(user.status === 'pool') {
        this.pool.push(user)
      }
    })
  }

  selectUser(id) {
    this.currentUser = {
      name: '',
      email: '',
      role: '',
      notes: ''
    };
    const filteredUser= this.userList.filter((user) => user._id === id);
    this.currentUser = filteredUser[0];
    console.log(this.currentUser)
  }

  // add user function
  addUser() {
    console.log(this.userObj)
    this._dashboardService.createUser(this.userObj)
      .subscribe((result: any) => {
        console.log(result);
        // generateLog
        $('#addModal').hide();
        $('.modal-backdrop').hide();
        this.getUsers();
        this.userObj = {
          name: '',
          email: '',
          password: '',
          status: '',
          role: '',
          notes: ''
        }
      }, (err: any) => {
        console.log(err);
      })
  }

  // delete user function
  deleteUser() {
    this._dashboardService.deleteUser(this.currentUser)
      .subscribe((result: any) => {
        console.log('deleted');
        $('#editModal').hide();
        $('.modal-backdrop').hide();
        this.getUsers();
      }, (err) => {
        console.log(err);
      })
  }

  // edit user function
  editUser() {
    this._dashboardService.editUser(this.currentUser)
          .subscribe((result: any) => {
            console.log('edited');
            $('#editModal').hide();
            $('.modal-backdrop').hide();
            // generate log here
          }, (err) => {
            console.log(err);
          })
  }

  // update user function
  updateUser(id, status) {
    let index  = _.findIndex(this.userList, (user) => id === user._id);
    let updatedObj = Object.assign({}, this.userList[index]);
    updatedObj.status = status;
    updatedObj.updatedAt = moment().local().format();
    this.userList[index].updatedAt = moment().local().format('MM/DD/YYYY h:mm:ss a');
    this._dashboardService.getUser(id)
      .subscribe((getResult: any) => {
        this._dashboardService.editUser(updatedObj)
          .subscribe((result: any) => {
            console.log('updated')
            this.generateLog(getResult.data, updatedObj);
            // generate log here
          }, (err) => {
            console.log(err);
          })
      }, (err: any) => {
        console.log(err);
      })
  }  
  
  generateLog(oldObj, newObj) {
    let type = 'update';
    console.log(oldObj)
    console.log(newObj)
    this.__logService.generateLog(type, false, oldObj, newObj)
      .subscribe((result: any) => {
        console.log(result)
      }, (err) => {
        console.log(err);
      })
  }
}


