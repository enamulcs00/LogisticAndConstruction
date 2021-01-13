import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete-fleet-owner',
  templateUrl: './delete-fleet-owner.component.html',
  styleUrls: ['./delete-fleet-owner.component.css']
})
export class DeleteFleetOwnerComponent implements OnInit {
  editForm: any;
  id: any;
  editData: any

  constructor(private router: Router, public service: MainService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
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
  }

  // -------------- view fleet owner ------------------- //
  viewFleetOwner() {
    this.service.showSpinner();
    // var url = "notification/get-announcement-data?announcementsId=" + this.id;
    var url = "account/admin/get-client-details?userIdToGetDetails=" + this.id
    this.service.get(url).subscribe((res: any) => {
      console.log('dff', res);
      this.service.hideSpinner();
      if (res.status == 200) {
        // this.editData=res.data[0],
        // this.editImage=res.data[0].imageUrl
        this.editData = res.data
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

  //------------------------------delete api integration ----------------------------------//
  deleteUser() {
    // var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userid) + '&ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location'));
    var url = `account/admin/delete-client-details?userIdToDeleteClient=${this.id}`
    console.log(url)
    //   this.service.get(url).subscribe((res: any) => {
    //     // this.deleted = res
    //     if (res.ststus = 200) {
    //       // $('#deleteModal').modal('hide')
    //       this.service.toasterSucc(res.message);
    //       // this.getlist();
    //       this.router.navigate(['/list-of-fleet-owner'])
    //     }
    //   }, err => {
    //     this.service.hideSpinner();
    //     if (err['status'] == '401') {
    //       this.service.onLogout();
    //       this.service.toasterErr('Unauthorized Access');
    //     }
    //     else {
    //       this.service.toasterErr('Something Went Wrong');
    //     }
    //   })
    }
  }
