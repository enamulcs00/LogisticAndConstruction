import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  addForm: FormGroup;
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  aadharimageUrl: any;
  panimageUrl: any;
  gstimageUrl: any;

  constructor(private router: Router, public service: MainService) { }

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
      'companyAddress': new FormControl('', [Validators.required]),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadhaarNo': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/i),Validators.minLength(12)]),
      'panCard': new FormControl('', [Validators.required,Validators.minLength(10)]),
      'gstNo': new FormControl('', [Validators.required])
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

  // upload Aadhar functionality and api
  uploadAadhar($event): void {
    var img = $event.target.files[0];
    this.uploadAadharFunc(img);
  }

  uploadAadharFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == '200') {
        this.aadharimageUrl = res['data'];
      }
    }, err => {
      this.service.hideSpinner();
    })
  }

  // upload Pan functionality and api
  uploadPan($event): void {
    var img = $event.target.files[0];
    this.uploadPanFunc(img);
  }

  uploadPanFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == '200') {
        this.panimageUrl = res['data'];
      }
    }, err => {
      this.service.hideSpinner();
    })
  }
   // upload GST functionality and api
   uploadGst($event): void {
    var img = $event.target.files[0];
    this.uploadGstFunc(img);
  }

  uploadGstFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == '200') {
        this.gstimageUrl = res['data'];
      }
    }, err => {
      this.service.hideSpinner();
    })
  }
  // submit add form 
  submitForm() {
    let apiReqData = {
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      mobileNo: this.addForm.value.mobileNo,
      emainId: this.addForm.value.emainId,
      companyName: this.addForm.value.companyName,
      companyAddress: this.addForm.value.companyAddress,
      city: this.addForm.value.city,
      state: this.addForm.value.state,
      aadhaarNo: this.addForm.value.aadhaarNo,
      panCard: this.addForm.value.panCard,
      gstNo: this.addForm.value.gstNo
    }
    console.log(apiReqData)
    this.router.navigate(['/list-of-companies'])
    // this.service.postApi('', apiReqData).subscribe((res: any) => {
    //   console.log(res);
    // })
  }

  

  uplaodPan() {

  }
}
