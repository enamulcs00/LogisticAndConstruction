import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any

@Component({
  selector: 'app-thermal-plants',
  templateUrl: './thermal-plants.component.html',
  styleUrls: ['./thermal-plants.component.css']
})
export class ThermalPlantsComponent implements OnInit {
  listing: any = [];
  deleted: any;
  userid: number;
  action: any;
  // pagination variable
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  // add thermal plant form variable
  addThermalPlantForm: FormGroup;
  stateArr: any = []
  selectedState: any;
  cityArr: any = []

  constructor(public service: MainService) { }

  ngOnInit() {
    this.getlist();
    this.addThermalPlantValidation();
    this.getStateList()
  }

  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/get-thermalPlants?page=${(this.currentPage - 1) + '&pageSize=' + (this.itemsPerPage)}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data'];
        this.totalItems = res.data.totalCount
      }
    })
  }

  // ------------------------ pagination -------------------------//
  pagination(page) {
    this.totalItems = page;
    this.getlist()
  }

  // -------------- add thermal form  validation --------------- //
  addThermalPlantValidation() {
    this.addThermalPlantForm = new FormGroup({
      'city': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
    })
  }

  // ---------------- add thermal form submit ----------------- //
  addThermalPlant() {
    let apiReqdata = {
      "city": this.addThermalPlantForm.value.city,
      "description": this.addThermalPlantForm.value.description,
      "state": this.addThermalPlantForm.value.state,
    }
    let url = 'account/admin/add-thermalPlants'
    this.service.showSpinner()
    this.service.post(url, apiReqdata).subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner()
      if (res.status == 200) {
        this.service.toasterSucc(res.message)
        this.getlist()
      } else {
        this.service.toasterErr(res.message)
      }
    })
  }

  // --------- get State list -------------- //
  getStateList() {
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.stateArr = res['data'];
      }
    })
  }

  // ----------- get city list --------------- //
  searchCity(event) {
    console.log("event", event)
    this.service.showSpinner()
    this.selectedState = event.target.value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.cityArr = res['data'];
      }
    })
  }
  //---------------------------------- active / block function --------------//
  openModal(action, userId) {
    this.userid = userId;
    this.action = action;
    console.log(this.action, this.userid)
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')

    } else if (action == 'false') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }

  blockUser() {
    let apiReqData = {
      "isEnable": this.action,
      "thermalPlantsId": this.userid,
    }
    this.service.showSpinner();
    var url = 'account/admin/changeStatus-thermalPlants'
    this.service.post(url, apiReqData).subscribe((res: any) => {
      if (res.status == 200) {
        this.service.hideSpinner()
        if (this.action == 'false') {
          $('#block').modal('hide');
          this.service.toasterSucc('Thermal Plant Blocked Successfully.');
        }
        else {
          $('#active').modal('hide');
          this.service.toasterSucc('Thermal Plant Activated Successfully.');
        }
        this.getlist()
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access.');
      }
      else {
        this.service.toasterErr('Something Went Wrong.');
      }
    })
  }

}