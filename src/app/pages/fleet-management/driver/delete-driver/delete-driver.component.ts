import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnInit {
  editForm: FormGroup;
  listing: any = [];
  id: any;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, public service: MainService) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
  }

  ngOnInit(): void {
    this.editFormValidation();
    this.getlist()
    this.viewDriver()
  }

  // ------------ add form validation ---------------- //
  editFormValidation() {
    this.editForm = new FormGroup({
      'aadharCardNo': new FormControl(''),
      'companyName': new FormControl(''),
      'drivingLicenceNo': new FormControl(''),
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'phoneNo': new FormControl('')
    })
    this.editForm.disable()
  }

  // ------------- get fleet owner name list ---------------- //
  getlist() {
    this.service.showSpinner()
    var url = "account/admin/filter-user-details?roleStatus=FLEET"
    this.service.get(url).subscribe((res: any) => {
      console.log('kfg', res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      } else {
        this.listing = [];
      }
    })
  }

  // ----------------- get driver details -------------- //
  viewDriver() {
    this.service.showSpinner();
    var url = "account/admin/get-client-details?userIdToGetDetails=" + this.id
    this.service.get(url).subscribe((res: any) => {
      console.log('dff', res);
      this.service.hideSpinner();
      if (res.status == 200) {
        this.editForm.patchValue({
          'aadharCardNo': res['data'].userDetail.aadharCardNo ? res['data'].userDetail.aadharCardNo : '',
          'companyName': res['data'].userDetail.joinId ? res['data'].userDetail.joinId : '',
          'drivingLicenceNo': res['data'].userDetail.drivingLicenceNo ? res['data'].userDetail.drivingLicenceNo : '',
          'firstName': res['data'].userDetail.firstName ? res['data'].userDetail.firstName : '',
          'lastName': res['data'].userDetail.lastName ? res['data'].userDetail.lastName : '',
          'phoneNo': res['data'].userDetail.phoneNo ? res['data'].userDetail.phoneNo : ''
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

  //------------------------------delete api integration ----------------------------------//
  deleteDriver() {
    var url = `account/admin/delete-client-details?userIdToDeleteClient=${this.id}`
    this.service.get(url).subscribe((res: any) => {
      if (res.ststus = 200) {
        this.service.toasterSucc(res.message);
        this.router.navigate(['/list-of-driver'])
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }
      else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

}