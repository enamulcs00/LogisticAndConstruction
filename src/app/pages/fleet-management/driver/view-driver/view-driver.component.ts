import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit {

  addForm: FormGroup;
  listing: any = [];

  id: any;

  constructor(public route: Router, public service: MainService, public active: ActivatedRoute) {
    this.active.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
  }
  ngOnInit(): void {
    this.addFormValidation();
    this.getlist()
    this.viewDriver()
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

  viewDriver() {
    this.service.showSpinner();
    // var url = "notification/get-announcement-data?announcementsId=" + this.id;
    var url = "account/admin/get-client-details?userIdToGetDetails=" + this.id
    this.service.get(url).subscribe((res: any) => {
      console.log('dff', res);
      if (res.status == 200) {
        this.service.hideSpinner();
        // this.editData=res.data[0],
        // this.editImage=res.data[0].imageUrl

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
  back(){
    this.route.navigate(['/list-of-driver'])
  }

}
