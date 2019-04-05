import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { LocationService } from './locations.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { LogService } from '../log.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(
    private _locationService: LocationService,
    private __logService: LogService
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  locationList = [];

  active = [];
  available = [];
  closed = [];

  locationObj = {
    name: '',
    tons: '',
    status: '',
    material: '',
    notes: ''
  }

  currentLocation: any = {
    name: '',
    tons: '',
    status: '',
    material: '',
    notes: ''
  }

  currentLocationCopy: any;

  isVisible: Boolean = false;
  add: Boolean = false;
 
  options: SortablejsOptions = {
    group: 'locations',
    animation: 150,
    onAdd: (evt) => {
      var itemEl = evt.item;
      console.log(evt)

      let status = evt.to.id;
      let oldStatus = evt.from.id;
      let itemId = evt.item.id;
      console.log(itemId)
      console.log("To " + status + " from " + oldStatus);
 
      // console.log(this)

      this.updateLocation(itemId, status);
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

  getLocations() {
    this.active = [];
    this.available = [];
    this.closed = [];
    this._locationService.getAllLocations()
      .subscribe((result: any) => {
        console.log(result)
        this.locationList = result.data;
        this.sortList(result.data);
      })
  }

  sortList(locations) {
    locations.forEach((location) => {
      location.updatedAt = moment(location.updatedAt).format('MM/DD/YYYY h:mm:ss a');
      if(location.status === 'active') {
        this.active.push(location)
      }
      if(location.status === 'available') {
        this.available.push(location)
      }
      if(location.status === 'closed') {
        this.closed.push(location)
      }
    })
  }

  selectLocation(id) {
    this.add = false;
    this.currentLocation = {
      name: '',
      tons: '',
      status: '',
      material: '',
      notes: ''
    };
    const filteredLocation= this.locationList.filter((location) => location._id === id);
    this.currentLocation = filteredLocation[0];
    this.currentLocationCopy = Object.assign({}, filteredLocation[0]);
    console.log(this.currentLocation)
  }

  clickAdd() {
    this.add = true;
  }

  addLocation() {
    console.log(this.locationObj)
    this._locationService.createLocation(this.locationObj)
      .subscribe((result: any) => {
        console.log(result);
        // generateLog
        $('#modal').hide();
        $('.modal-backdrop').hide();
        this.getLocations();
        this.locationObj = {
          name: '',
          tons: '',
          status: '',
          material: '',
          notes: ''
        };
      }, (err: any) => {
        console.log(err);
      })
  }

  deleteLocation() {
    this._locationService.deleteLocation(this.currentLocation)
      .subscribe((result: any) => {
        console.log('deleted');
        $('#modal').hide();
        $('.modal-backdrop').hide();
        this.getLocations();
      }, (err) => {
        console.log(err);
      })
  }

  editLocation() {
    if(JSON.stringify(this.currentLocation) !== JSON.stringify(this.currentLocationCopy)) {
      this.generateLog('edit', this.currentLocationCopy, this.currentLocation);
      this._locationService.editLocation(this.currentLocation)
            .subscribe((result: any) => {
              console.log('edited');
              $('#modal').hide();
              $('.modal-backdrop').hide();
              // generate log here
            }, (err) => {
              console.log(err);
            })
    }
  }

  updateLocation(id, status) {
    let index  = _.findIndex(this.locationList, (location) => id === location._id);
    let updatedObj = Object.assign({}, this.locationList[index]);
    updatedObj.status = status;
    updatedObj.updatedAt = moment().local().format();
    this.locationList[index].updatedAt = moment().local().format('MM/DD/YYYY h:mm:ss a');
    this._locationService.getLocation(id)
      .subscribe((getResult: any) => {
        this._locationService.editLocation(updatedObj)
          .subscribe((result: any) => {
            console.log('updated')
            this.generateLog('update', getResult.data, updatedObj);
            // generate log here
            
            
          }, (err) => {
            console.log(err);
          })
      }, (err: any) => {
        console.log(err);
      })
  }  
  
  generateLog(type, oldObj, newObj) {
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