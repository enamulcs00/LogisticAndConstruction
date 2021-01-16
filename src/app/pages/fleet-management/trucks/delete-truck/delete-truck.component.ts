import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-delete-truck',
  templateUrl: './delete-truck.component.html',
  styleUrls: ['./delete-truck.component.css']
})
export class DeleteTruckComponent implements OnInit {

  editForm: FormGroup;
  listing: any = [];
  pageNumber: number = 1
  pageSize: any = 10;
  listingTruckType: any = [];
  id: any;
  truckData: any;

  constructor(private activatedRoute:ActivatedRoute,private router: Router, public service: MainService) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
   }

  ngOnInit(): void {
    this.editFormValidation();
    this.getlist();
    this.getTruckTypelist()
    this.getTruckDetail()
  }

  // ------------ add form validation ---------------- //
  editFormValidation() {
    this.editForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'fleetOnwerNo': new FormControl('', Validators.required),
      'typeOfTruck': new FormControl('', Validators.required),
      'registrationNo': new FormControl('', Validators.required)
    })
    this.editForm.disable()
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
  getTruckTypelist() {
    // this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = "account/admin/get-truckTypeDetails?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}`
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listingTruckType = res['data']['data'];
      }

    })
  }

  getTruckDetail(){
    // this.service.showSpinner()
    // account/admin/get-truckByAdmin?truckId=1
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = `account/admin/get-truckByAdmin?truckId=${this.id}`
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
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

    //------------------------------delete api integration ----------------------------------//
    deleteTruck() {
      // var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userid) + '&ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location'));
      var url = `account/admin/delete-truckByAdmin?truckId=${this.id}`
      this.service.post(url, '').subscribe((res: any) => {
        // this.deleted = res
        if (res.ststus = 200) {
          // $('#deleteModal').modal('hide')
          this.service.toasterSucc(res.message);
          // this.getlist();
          this.router.navigate(['/list-of-truck'])
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
