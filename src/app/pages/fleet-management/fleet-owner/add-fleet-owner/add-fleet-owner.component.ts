import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-fleet-owner',
  templateUrl: './add-fleet-owner.component.html',
  styleUrls: ['./add-fleet-owner.component.css']
})
export class AddFleetOwnerComponent implements OnInit {
  addForm: FormGroup;
  aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addFormValidation()
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


  // submit add form 
  submitForm() {
    let apiReqData = {
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      // countryCode: '+91',
      phoneNo: '+91' + this.addForm.value.phoneNo,
      pnWithoutCountryCode: this.addForm.value.phoneNo,
      email: this.addForm.value.email,
      companyName: this.addForm.value.companyName,
      baseLocationAddress: this.addForm.value.baseLocationAddress,
      city: this.addForm.value.city,
      state: this.addForm.value.state,
      aadharCardNo: this.addForm.value.aadharCardNo,
      aadharCardUrl: this.aadharCardUrl,
      panCardNo: this.addForm.value.panCardNo,
      panCardUrl: this.panCardUrl,
      gstinNo: this.addForm.value.gstinNo,
      gstinUrl: this.gstinUrl,
      "roleStatus": "FLEET",
    }
    console.log(apiReqData)
    this.service.post('account/admin/add-CompanyBy-admin', apiReqData).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/list-of-fleet-owner'])
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

  // handleInputChange(event) {
  //   var self = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var type = event.target.files[0].type;
  //     if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
  //       let fileData = event.target.files[0];
  //       this.sendFormData(fileData)
  //       var reader = new FileReader()
  //     } else {
  //       //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
  //     }
  //   }

  // }

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
}