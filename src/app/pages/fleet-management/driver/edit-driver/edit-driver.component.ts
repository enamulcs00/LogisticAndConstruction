import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  editForm: FormGroup;
  listing: any = [];
  id: any;

  constructor(public router: Router, public service: MainService, public active: ActivatedRoute) {
    this.active.params.subscribe((params) => {
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
      'aadharCardNo': new FormControl('', Validators.required),
      'companyName': new FormControl('', Validators.required),
      'drivingLicenceNo': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'phoneNo': new FormControl('', Validators.required)
    })
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

  // --------------------- edit driver ----------------- //
  editDriver() {
    console.log("edit driver..")
    // this.route.navigate(['/edit-driver', this.id])
    let url = 'account/admin/edit-DriverByAdmin'
    let apiReqData = {
      aadharCardNo: this.editForm.value.aadharCardNo,
      // companyName: this.editForm.value.companyName,
      drivingLicenceNo: this.editForm.value.drivingLicenceNo,
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      phoneNo: this.editForm.value.phoneNo,
      suffixPhoneNo: this.editForm.value.phoneNo,
      roleStatus: "DRIVER",
      fkFleetId: this.editForm.value.companyName,
      "userDetailId": Number(this.id)
    }
    console.log(apiReqData)
    this.service.post(url, apiReqData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.service.toasterSucc('Driver updated successfully.')
        this.router.navigate(['/list-of-driver'])
      } else {
        this.service.toasterErr('Something went wrong.')
      }
    })
  }


  cancel() {
    this.router.navigate(['/list-of-driver'])
  }
}

