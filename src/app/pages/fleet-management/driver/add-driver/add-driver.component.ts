import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  addForm: FormGroup;
  listing: any = [];

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addFormValidation();
    this.getlist()
  }

  // ------------ add form validation ---------------- //
  addFormValidation() {
    this.addForm = new FormGroup({
      'aadharCardNo': new FormControl(''),
      'companyName': new FormControl(''),
      'drivingLicenceNo': new FormControl(''),
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'phoneNo': new FormControl('')
    })
  }

  // ------------- get fleet owner name list ---------------- //
  getlist() {
    this.service.showSpinner()
    var url = "account/admin/filter-user-details?roleStatus=FLEET"
    this.service.get(url).subscribe((res: any) => {
      console.log('kfg', this.listing);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      } else {
        this.listing = [];
      }
    })
  }

  // ------------- submit add form ----------------- //
  submitForm() {
    let apiReqData = {
      aadharCardNo: this.addForm.value.aadharCardNo,
      companyName: this.addForm.value.companyName,
      drivingLicenceNo: this.addForm.value.drivingLicenceNo,
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      phoneNo: '+91' + this.addForm.value.phoneNo,
      pnWithoutCountryCode: this.addForm.value.phoneNo,
      roleStatus: "DRIVER",
    }
    console.log(apiReqData)
    this.service.post('account/admin/add-CompanyBy-admin', apiReqData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.service.toasterSucc('Driver added successfully.')
        this.router.navigate(['/list-of-driver'])
      } else {
        this.service.toasterErr('Something went wrong.')
      }
    })
  }
}
