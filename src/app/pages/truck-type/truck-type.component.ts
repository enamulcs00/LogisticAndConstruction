import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any

@Component({
  selector: 'app-truck-type',
  templateUrl: './truck-type.component.html',
  styleUrls: ['./truck-type.component.css']
})
export class TruckTypeComponent implements OnInit {
  listing: any = [];
  id: number;
  userid: number;
  action: any;
  addTruckForm: FormGroup;

  // pagination variable
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any

  constructor(public service: MainService) { }

  ngOnInit() {
    this.getlist();
    this.addTruckFormValidation();
  }

  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/get-truckTypeDetails?page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        // console.log(this.totalItems)
        this.listing = res['data']['data'];
        this.totalItems = res.data.count
      } else {
        this.listing = [];
        this.totalItems = 0
      }
    })
  }

  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }

  //---------------------------------- Delete / Block Function--------------//
  openModal(action, userId) {
    this.userid = userId;
    this.action = action;
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')
    } else if (action == 'BLOCK') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }

  //------------------------------delete api integration ----------------------------------//
  deleteUser() {
    let apiReqData = {
      truckTypeId: this.userid,
      isDeleted: true
    }
    var url = 'account/admin/changeStatus-truckType'
    this.service.showSpinner()
    this.service.post(url, apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res.ststus = 200) {
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.getlist();
      } else {
        $('#deleteModal').modal('hide')
        this.service.toasterErr(res.message);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access.');
      }
      else {
        this.service.toasterErr('Something went wrong.');
      }
    })
  }

  /**
   * ************************************************************************* Add Truck Type *************************************
   * add truck type
   */
  // ---------------- add truck type form validation ------------------ //
  addTruckFormValidation() {
    this.addTruckForm = new FormGroup({
      'typeOfTruck': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }

  // --------------- add truck type --------------- //
  addTruckType() {
    let apiReqData = {
      'description': this.addTruckForm.value.description,
      'typeOfTruck': this.addTruckForm.value.typeOfTruck
    }
    console.log(apiReqData);
    this.service.showSpinner();
    this.service.post('account/admin/add-truckType', apiReqData).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        this.getlist()
        this.service.toasterSucc('Truck type added successfully.')
        this.addTruckForm.reset()
      } else {
        this.service.hideSpinner();
        this.service.toasterErr(res.message)
      }
    })
  }

}
