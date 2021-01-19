import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  editCompanyForm: FormGroup;
  userId: any;
  companyDetails: any;
  aadharimageUrl: any;
  panimageUrl: any;
  gstimageUrl: any;
  email: any;
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
       this.editCompanyFormValidation()
       this.getCompanyDetails()
       this.getStateList()
  }

  editCompanyFormValidation() {
    this.editCompanyForm = new FormGroup({
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
      'gstNo': new FormControl('', [Validators.required]),
      'attachmentName1': new FormControl('', [Validators.required]),
      'attachmentName2': new FormControl('', [Validators.required]),
    })
  }

  getCompanyDetails() {
    this.service.showSpinner()
    var url = "account/admin/get-client-details?userIdToGetDetails="+ this.userId
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.companyDetails = res['data']['userDetail'];
        this.email = res['data']['email']
        this.aadharimageUrl =this.companyDetails.aadharCardUrl
        this.panimageUrl = this.companyDetails.panCardUrl
        this.gstimageUrl = this.companyDetails.gstinUrl

        this.editCompanyForm.patchValue({
          'firstName': this.companyDetails.firstName,
          'lastName':this.companyDetails.lastName,
          'phoneNo': this.companyDetails.pnWithoutCountryCode,
          'email': this.email,
          'companyName': this.companyDetails.companyName,
          'companyAddress':this.companyDetails.baseLocationAddress,
          'city': this.companyDetails.city,
          'state': this.companyDetails.state,
          'aadhaarNo': this.companyDetails.aadharCardNo,
          'panCard': this.companyDetails.panCardNo,
          'gstNo': this.companyDetails.gstinNo,
          
        })
      }
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

  // // upload Aadhar functionality and api
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
  update() {
    let apiReqData = {
     
     
      "companyName": this.editCompanyForm.value.companyName,
      "baseLocationAddress":  this.editCompanyForm.value.companyAddress,
      "email": this.editCompanyForm.value.email,
      "firstName": this.editCompanyForm.value.firstName,
      "lastName": this.editCompanyForm.value.lastName,
      "roleStatus": "COMPANY",
      "phoneNo": '+91' + this.editCompanyForm.value.phoneNo,
      "pnWithoutCountryCode": this.editCompanyForm.value.phoneNo,
      "countryCode": "+91",
      "country": "INDIA",
      "state": this.editCompanyForm.value.state,
      "city": this.editCompanyForm.value.city,
      "aadharCardNo": this.editCompanyForm.value.aadhaarNo,
      "aadharCardUrl": this.aadharimageUrl,
      "panCardNo": this.editCompanyForm.value.panCard,
      "panCardUrl": this.panimageUrl,
      "gstinNo": this.editCompanyForm.value.gstNo,
      "gstinUrl": this.gstimageUrl,
      
    }
    console.log("data", apiReqData)
    this.service.showSpinner()
    var url = "account/admin/update-profile-other-role?userIdForUpdateprofile="+this.userId
    this.service.post(url,apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc('Company updated successfully.')
        this.router.navigateByUrl('/list-of-companies')
        //this.stateArr = res['data'];
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('/list-of-companies')
  }

}
