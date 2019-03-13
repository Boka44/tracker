import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { EquipmentService } from './equipment.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { LogService } from '../log.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor(
    private _equipmentService: EquipmentService,
    private __logService: LogService
  ) { }

  ngOnInit() {
    this.getEquipments();
  }

  equipmentList = [];

  active = [];
  parked = [];
  down = [];

  equipmentObj = {
    name: '',
    engineHours: '',
    status: '',
    mileage: '',
    location: '',
    miner: '',
    notes: ''
  }

  currentEquipment: any = {
    name: '',
    engineHours: '',
    status: '',
    mileage: '',
    location: '',
    miner: '',
    notes: ''
  };

  isVisible: Boolean = false;

 
  options: SortablejsOptions = {
    group: 'equipments',
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

      this.updateEquipment(itemId, status);
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

  getEquipments() {
    this.active = [];
    this.parked = [];
    this.down = [];
    this._equipmentService.getAllEquipments()
      .subscribe((result: any) => {
        console.log(result)
        this.equipmentList = result.data;
        this.sortList(result.data);
      })
  }

  sortList(equipments) {
    equipments.forEach((equipment) => {
      equipment.updatedAt = moment(equipment.updatedAt).format('MM/DD/YYYY h:mm:ss a');
      if(equipment.status === 'active') {
        this.active.push(equipment)
      }
      if(equipment.status === 'parked') {
        this.parked.push(equipment)
      }
      if(equipment.status === 'down') {
        this.down.push(equipment)
      }
    })
  }

  selectEquipment(id) {
    this.currentEquipment = {
      name: '',
      engineHours: '',
      status: '',
      mileage: '',
      location: '',
      miner: '',
      notes: ''
    };
    const filteredEquipment= this.equipmentList.filter((equipment) => equipment._id === id);
    this.currentEquipment = filteredEquipment[0];
    console.log(this.currentEquipment)
  }

  addEquipment() {
    console.log(this.equipmentObj)
    this._equipmentService.createEquipment(this.equipmentObj)
      .subscribe((result: any) => {
        console.log(result);
        // generateLog
        $('#addModal').hide();
        $('.modal-backdrop').hide();
        this.getEquipments();
        this.equipmentObj = {
          name: '',
          engineHours: '',
          status: '',
          mileage: '',
          location: '',
          miner: '',
          notes: ''
        }
      }, (err: any) => {
        console.log(err);
      })
  }

  deleteEquipment() {
    this._equipmentService.deleteEquipment(this.currentEquipment)
      .subscribe((result: any) => {
        console.log('deleted');
        $('#editModal').hide();
        $('.modal-backdrop').hide();
        this.getEquipments();
      }, (err) => {
        console.log(err);
      })
  }

  editEquipment() {
    this._equipmentService.editEquipment(this.currentEquipment)
          .subscribe((result: any) => {
            console.log('edited');
            $('#editModal').hide();
            $('.modal-backdrop').hide();
            // generate log here
          }, (err) => {
            console.log(err);
          })
  }

  updateEquipment(id, status) {
    let index  = _.findIndex(this.equipmentList, (equipment) => id === equipment._id);
    let updatedObj = Object.assign({}, this.equipmentList[index]);
    updatedObj.status = status;
    updatedObj.updatedAt = moment().local().format();
    this.equipmentList[index].updatedAt = moment().local().format('MM/DD/YYYY h:mm:ss a');
    this._equipmentService.getEquipment(id)
      .subscribe((getResult: any) => {
        this._equipmentService.editEquipment(updatedObj)
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
