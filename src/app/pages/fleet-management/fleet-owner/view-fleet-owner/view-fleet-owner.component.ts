import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-fleet-owner',
  templateUrl: './view-fleet-owner.component.html',
  styleUrls: ['./view-fleet-owner.component.css']
})
export class ViewFleetOwnerComponent implements OnInit {
  editForm: any;
  id: any;
  editData: any
  aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;

  stateArr: any = [];
  selectedState: any;
  cityArr: any = [];
  selectedCity: any;

  constructor(public router: Router, public service: MainService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
  }
  ngOnInit(): void {
    this.addFormValidation()
    this.viewFleetOwner();
    this.getStateList()
  }

  // add form validation
  addFormValidation() {
    this.editForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'phoneNo': new FormControl(''),
      'email': new FormControl(''),
      'companyName': new FormControl(''),
      'baseLocationAddress': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadharCardNo': new FormControl(''),
      'panCardNo': new FormControl(''),
      'gstinNo': new FormControl('')
    })
    this.editForm.disable();
  }

  // --------- get State list -------------- //
  getStateList() {
    // this.service.showSpinner()
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
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

  patchCity(value) {
    this.service.showSpinner()
    this.selectedState = value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.cityArr = res['data'];
        this.editForm.patchValue({
          'city': res.data.userDetail.city ? res.data.userDetail.city : ''
        })
      }
    })
  }

  // -------------- view fleet owner ------------------- //
  viewFleetOwner() {
    this.service.showSpinner();
    var url = `account/admin/get-client-details?userIdToGetDetails=${this.id}`
    this.service.get(url).subscribe((res: any) => {
      console.log('dff', res);
      this.service.hideSpinner();
      if (res.status == 200) {
        this.editData = res.data
        this.aadharCardUrl = res.data.userDetail.aadharCardUrl ? res.data.userDetail.aadharCardUrl : '';
        this.panCardUrl = res.data.userDetail.panCardUrl ? res.data.userDetail.panCardUrl : ''
        this.gstinUrl = res.data.userDetail.gstinUrl ? res.data.userDetail.gstinUrl : ''
        this.selectedCity = res.data.userDetail.city ? res.data.userDetail.city : ''
        let state = res.data.userDetail.state ? res.data.userDetail.state : ''
        this.patchCity(state)
        this.editForm.patchValue({
          'firstName': res.data.userDetail.firstName ? res.data.userDetail.firstName : '',
          'lastName': res.data.userDetail.lastName ? res.data.userDetail.lastName : '',
          'phoneNo': res.data.userDetail.phoneNo ? res.data.userDetail.phoneNo : '',
          'email': res.data.email ? res.data.email : '',
          'companyName': res.data.userDetail.companyName ? res.data.userDetail.companyName : '',
          'baseLocationAddress': res.data.userDetail.baseLocationAddress ? res.data.userDetail.baseLocationAddress : '',
          'city': res.data.userDetail.city ? res.data.userDetail.city : '',
          'state': res.data.userDetail.state ? res.data.userDetail.state : '',
          'aadharCardNo': res.data.userDetail.aadharCardNo ? res.data.userDetail.aadharCardNo : '',
          'panCardNo': res.data.userDetail.panCardNo ? res.data.userDetail.panCardNo : '',
          'gstinNo': res.data.userDetail.gstinNo ? res.data.userDetail.gstinNo : '',
        })

      }

    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  }

  // edit fleet owner
  editFleetOwner() {
    this.router.navigate(['edit-fleet-owner', this.id])
  }

}
