import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/pairwise';
import { filter, pairwise } from 'rxjs/operators';

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
  cityArr: any;
  constructor(private router: Router, public service: MainService) {

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    this.addFormValidation()
    this.getStateList()

  }

  // add form validation
  addFormValidation() {
    this.addForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'baseLocationAddress': new FormControl('', [Validators.required]),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadharCardNo': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/i), Validators.minLength(12)]),
      'panCardNo': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'gstinNo': new FormControl('', [Validators.required]),
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

  addRoutes() {
    this.router.navigate(['/routes'])
  }
}