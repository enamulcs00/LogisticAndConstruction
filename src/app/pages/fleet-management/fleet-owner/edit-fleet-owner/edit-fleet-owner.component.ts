import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-fleet-owner',
  templateUrl: './edit-fleet-owner.component.html',
  styleUrls: ['./edit-fleet-owner.component.css']
})
export class EditFleetOwnerComponent implements OnInit {

  editForm: any;
  id: any;
  editData: any

  aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;

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
  
  uploadAadhaar(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataAadhaar(fileData)
        // console.log("aadhaar card->", this.aadharCardUrl)
        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }

  uplaodPan(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataPan(fileData)
        // console.log("pan card->", this.panCardUrl)

        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }
  uplaodGst(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataGst(fileData)
        // console.log("gst card->", this.gstinUrl)
        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }


  /** to call form data infoNotification */
  sendFormDataAadhaar(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => { 
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.aadharCardUrl = res.data

        console.log("aadhaar card->", this.aadharCardUrl)

      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      // this.service.toasterErr(res.message)
    });
  }
  sendFormDataPan(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => { 
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.panCardUrl = res.data
        console.log("pan card->", this.panCardUrl)


      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      // this.service.toasterErr(res.message)
    });
  }
  sendFormDataGst(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => { 
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.gstinUrl = res.data

        console.log("gst card->", this.gstinUrl)

      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      // this.service.toasterErr(res.message)
    });
  }

  editFleetOwner(){
    
  }
}
