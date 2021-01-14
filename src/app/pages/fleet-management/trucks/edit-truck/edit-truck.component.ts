import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-truck',
  templateUrl: './edit-truck.component.html',
  styleUrls: ['./edit-truck.component.css']
})
export class EditTruckComponent implements OnInit {
  editForm: FormGroup;
  listing: any = [];
  pageNumber: number = 1
  pageSize: any = 10;
  listingTruckType: any = [];
  id: any
  truckData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: MainService) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id
    })
  }

  ngOnInit(): void {
    this.addFormValidation();
    this.getlist();
    this.getTruckTypelist()
    this.getTruckDetail()
  }

  // ------------ add form validation ---------------- //
  addFormValidation() {
    this.editForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'fleetOnwerNo': new FormControl('', Validators.required),
      'typeOfTruck': new FormControl('', Validators.required),
      'registrationNo': new FormControl('', Validators.required)
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


  //-----------------------------list api integration --------------------------------//
  getTruckTypelist() {
    this.service.showSpinner()
    var url = "account/admin/get-truckTypeDetails?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listingTruckType = res['data'];
      }

    })
  }

  // ------------------------ get truck details ---------------------- //
  getTruckDetail() {
    var url = `account/admin/get-truckByAdmin?truckId=${this.id}`
    this.service.get(url).subscribe((res: any) => {
      console.log(res)
      if (res['status'] == 200) {
        this.truckData = res['data'];
        this.editForm.patchValue({
          'description': res['data'].description ? res['data'].description : '',
          'fleetOnwerNo': res['data'].fkFleetId ? res['data'].fkFleetId : '',
          'typeOfTruck': res['data'].typeOfTruck ? res['data'].typeOfTruck : '',
          'registrationNo': res['data'].registrationNo ? res['data'].registrationNo : ''
        })
      }
    })
  }

  // ---------------------- navigate to edit truck --------------------- //
  updateTruck() {
    console.log("update truck..")
    // this.router.navigate(['/edit-truck'])
  }

  cancel() {
    this.router.navigate(['/list-of-truck'])
  }
}