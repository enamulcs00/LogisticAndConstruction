import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css']
})
export class AddTruckComponent implements OnInit {
  addForm: FormGroup;
  listing: any = [];
  pageNumber: number = 1
  pageSize: any = 10;
  listingTruckType: any = [];

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addFormValidation();
    this.getlist();
    this.getTruckTypelist()
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
  getlist() {
    // this.service.showSpinner()
    var url = "account/admin/filter-user-details?roleStatus=FLEET"
    this.service.get(url).subscribe((res: any) => {
      console.log('kfg', this.listing);
      // this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      } else {
        this.listing = [];
      }
    })
  }


  //-----------------------------list api integration --------------------------------//
  // getTruckTypelist() {
  //   // this.service.showSpinner()
  //   var url = "account/admin/get-truckTypeDetails?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}`
  //   this.service.get(url).subscribe((res: any) => {
  //     // this.service.hideSpinner()
  //     if (res['status'] == 200) {
  //       this.listingTruckType = res['data']['data'];
  //     }
  //   })
  // }
  getTruckTypelist() {
    // this.service.showSpinner()
    var url = 'account/admin/get-truckTypeName'
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listingTruckType = res['data'];
      }
    })
  }

  // ------------- submit add form ----------------- //
  submitForm() {
    let apiReqData = {
      description: this.addForm.value.description,
      fleetOnwerNo: this.addForm.value.fleetOnwerNo,
      fkFleetId: this.addForm.value.fleetOnwerNo,
      typeOfTruck: this.addForm.value.typeOfTruck,
      registrationNo: this.addForm.value.registrationNo
    }
    console.log(apiReqData)
    this.service.showSpinner();
    this.service.post('account/admin/add-truckByAdmin', apiReqData).subscribe((res: any) => {
      console.log(res);
      this.service.hideSpinner()
      if (res.status == 200) {
        this.service.toasterSucc('Truck added successfully.')
        this.router.navigate(['/list-of-truck'])
      } else {
        this.service.toasterErr('Something went wrong.')
      }
    })
  }
}

