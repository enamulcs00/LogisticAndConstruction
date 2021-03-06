import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/pairwise';
// import { filter, pairwise } from 'rxjs/operators';

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

  stateArr: any = [];
  selectedState: any;
  cityArr: any = [];

  paramData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: MainService) {
    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     console.log('previous url', events[0].urlAfterRedirects);
    //     console.log('current url', events[1].urlAfterRedirects);
    //   });
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paramData = this.router.getCurrentNavigation().extras.state.paramData;
        console.log(this.paramData)
      }
    });
  }

  ngOnInit(): void {
    this.addFormValidation()
    this.getStateList()
    if (this.paramData) {
      let state = this.paramData.state ? this.paramData.state : ''
      this.patchCity(state)
      this.addForm.patchValue({
        'firstName': this.paramData.firstName ? this.paramData.firstName : '',
        'lastName': this.paramData.lastName ? this.paramData.lastName : '',
        'phoneNo': this.paramData.phoneNo ? this.paramData.phoneNo : '',
        'email': this.paramData.email ? this.paramData.email : '',
        'companyName': this.paramData.companyName ? this.paramData.companyName : '',
        'baseLocationAddress': this.paramData.baseLocationAddress ? this.paramData.baseLocationAddress : '',
        'city': this.paramData.city ? this.paramData.city : '',
        'state': this.paramData.state ? this.paramData.state : '',
        'aadharCardNo': this.paramData.aadharCardNo ? this.paramData.aadharCardNo : '',
        'panCardNo': this.paramData.panCardNo ? this.paramData.panCardNo : '',
        'gstinNo': this.paramData.gstInNo ? this.paramData.gstInNo : '',
      })
      this.addForm.disable()
    }
  }

  // add form validation
  addFormValidation() {
    this.addForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'baseLocationAddress': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadharCardNo': new FormControl(''),
      'panCardNo': new FormControl(''),
      'gstinNo': new FormControl('')
    })
  }

  //get State list
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

  // ----------- patch city when comes from unverified signup data page --------------- //
  patchCity(value) {
    console.log("city value", value)
    this.service.showSpinner()
    this.selectedState = value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        // console.log(res.data.userDetail.city)
        this.cityArr = res['data'];
        this.addForm.patchValue({
          'city': this.paramData.city ? this.paramData.city : ''
        })
      }
    })
  }

  // ----------------------- submit add form ---------------------------- //
  submitForm() {
    var apiReqData = {
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      phoneNo: this.addForm.value.phoneNo.startsWith('+91') ? this.addForm.value.phoneNo : '+91' + this.addForm.value.phoneNo,
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
    if (this.paramData) {
      apiReqData['idForValidateData'] = this.paramData.userId
    }
    console.log(apiReqData)
    this.service.showSpinner()
    this.service.post('account/admin/add-CompanyBy-admin', apiReqData).subscribe((res: any) => {
      console.log(res);
      this.service.hideSpinner()
      if (res.status == 200) {
        // this.router.navigate(['/list-of-fleet-owner'])
        let userId = this.paramData ? this.paramData.userId : res.data
        console.log(userId)
        this.router.navigate(['/routes', userId])
        this.service.toasterSucc(res.message)
        // this.router.navigate(['/routes', 1])
      } else {
        this.service.toasterErr(res.message);
      }
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

  // addRoutes() {
  //   this.router.navigate(['/routes'])
  // }
}