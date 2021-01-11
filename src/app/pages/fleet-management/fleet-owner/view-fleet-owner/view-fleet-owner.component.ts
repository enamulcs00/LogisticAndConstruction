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
  addForm: any;
  id: any;

  constructor(public route: Router, public service: MainService, public active: ActivatedRoute) {
    this.active.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
  }
  ngOnInit(): void {
    this.addFormValidation()
    this.viewFleetOwner()
  }

  // add form validation
  addFormValidation() {
    this.addForm = new FormGroup({
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
  }

  viewFleetOwner() {
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
}
