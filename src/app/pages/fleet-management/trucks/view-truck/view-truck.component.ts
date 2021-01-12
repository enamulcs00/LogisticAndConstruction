import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-truck',
  templateUrl: './view-truck.component.html',
  styleUrls: ['./view-truck.component.css']
})
export class ViewTruckComponent implements OnInit {

  addForm: FormGroup;
  // listing: any = [];
  pageNumber: number = 1
  pageSize: any = 10;
  listingTruckType: any = [];

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addFormValidation();
    // this.getlist();
    this.getTruckTypelist()
    this.getTruckDetail()
  }

  // ------------ add form validation ---------------- //
  addFormValidation() {
    this.addForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'fleetOnwerNo': new FormControl('', Validators.required),
      'typeOfTruck': new FormControl('', Validators.required),
      'registrationNo': new FormControl('', Validators.required)
    })
  }

  // ------------- get fleet owner name list ---------------- //
  // getlist() {
  //   this.service.showSpinner()
  //   var url = "account/admin/filter-user-details?roleStatus=FLEET"
  //   this.service.get(url).subscribe((res: any) => {
  //     console.log('kfg', this.listing);
  //     this.service.hideSpinner()
  //     if (res['status'] == 200) {
  //       this.listing = res['data']['list'];
  //     } else {
  //       this.listing = [];
  //     }
  //   })
  // }


  //-----------------------------list api integration --------------------------------//
  getTruckTypelist() {
    this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = "account/admin/get-truckTypeDetails?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listingTruckType = res['data'];
      }

    })
  }

  getTruckDetail(){
    // this.service.showSpinner()
    // account/admin/get-truckByAdmin?truckId=1
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = "account/admin/get-truckByAdmin?truckId=1"
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listingTruckType = res['data'];
      }

    })
  }

  editForm(){

  }
}