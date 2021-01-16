import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../../provider/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  listing: any = [];
  editForm: FormGroup;
  id: any;
  editData: any
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;
  constructor(private service:MainService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.id = res.id;
      })
    this.editSupplerFormValidation()
    this.getStateList()
    this.getlist()
  }

  editSupplerFormValidation() {
    let panPattern = "^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"
    let Gstpattern = "^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}$"
    let AadharPattern = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";

    this.editForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'phoneNo': new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl(''),
      'baseLocationAddress': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadharCardNo': new FormControl('',[Validators.required,Validators.pattern(AadharPattern)]),
      'panCardNo': new FormControl('', [Validators.required,Validators.pattern(panPattern)]),
      'gstinNumber': new FormControl('',[Validators.required,Validators.pattern(Gstpattern)])
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
  getStateList() {
    this.service.showSpinner()
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.stateArr = res['data'];
      }
    })
  }

  //get city list
  searchCity(event) {
    console.log("event", event)
    this.service.showSpinner()
    this.selectedState = event.target.value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.cityArr = res['data'];
      }
    })
  }
  getlist(){
    let channel = `account/admin/get-client-details?userIdToGetDetails=${this.id}`
    this.service.showSpinner()

    this.service.get(channel).subscribe((res:any)=>{
console.log('View Response',res.data)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res.message)
        this.listing = res.data;
        this.aadharCardUrl = res.data.userDetail.aadharCardUrl ? res.data.userDetail.aadharCardUrl : 'https://images.app.goo.gl/8DASmk93XpRTLdsG9';
        this.panCardUrl = res.data.userDetail.panCardUrl ? res.data.userDetail.panCardUrl : 'https://images.app.goo.gl/aDwPDsFSsVwxKQiq5'
        this.gstinUrl = res.data.userDetail.gstinUrl ? res.data.userDetail.gstinUrl : 'https://images.app.goo.gl/sCaxYXNT8VM47Ahq6'
        console.log('This is image pack',this.listing.userDetail)


        this.editForm.patchValue({
          firstName: this.listing?.userDetail?.firstName,
          lastName: this.listing?.userDetail?.lastName,
          phoneNo: this.listing?.userDetail?.phoneNo,
          email: this.listing?.email,
          baseLocationAddress: this.listing?.userDetail?.baseLocationAddress,
          city: this.listing?.userDetail?.city,
          state: this.listing?.userDetail?.state,
          aadharCardNo: this.listing?.userDetail?.aadharCardNo,
          panCardNo: this.listing?.userDetail?.panCardNo,
          gstinNumber: this.listing?.userDetail?.gstinNo,
          companyName: this.listing?.userDetail?.companyName
        })
      }
      else {

        this.service.toasterErr(res.message)
      }
    },(error:any)=>{
console.log('Error',error)
      this.service.toasterErr('Something went wrong')
    }
    )
  }
  editSupplier(){}
}
