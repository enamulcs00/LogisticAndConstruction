import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-sites',
  templateUrl: './add-sites.component.html',
  styleUrls: ['./add-sites.component.css']
})
export class AddSitesComponent implements OnInit {

  addSiteForm: FormGroup;
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  gstimageUrl: any;
  listing: any = [];
  companyNameArr: any = [];

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addSiteFormValidation()
    this.getStateList()
    this.getCompanyList()
  }

   // add site form validation
   addSiteFormValidation() {
    this.addSiteForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'companyAddress': new FormControl('', [Validators.required]),
      'siteAddress': new FormControl('', [Validators.required]),
      'siteName': new FormControl('', [Validators.required]),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'gstNo': new FormControl('', [Validators.required]),
    })
  }

  getCompanyList(){
    this.service.showSpinner()
    var url="account/admin/filter-user-details?roleStatus="+'COMPANY'
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
        this.listing.forEach(element => {
          this.companyNameArr.push({
            'companyName': element.companyName,
            'companyId': element.userId
          })
        });
        console.log('Company array', this.companyNameArr)
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

  //Add site functionality and api
  addSite(){
   let data= {
      "city": this.addSiteForm.value.city,
      "companyName": '',
     // "createTime": "2021-01-14T05:31:45.210Z",
      "fkcompanyId": this.addSiteForm.value.companyName,
      "gstinNo": this.addSiteForm.value.gstNo,
     // "isDeleted": true,
     // "isEnable": true,
      "locationAddress": this.addSiteForm.value.companyAddress,
      "siteAddress": this.addSiteForm.value.siteAddress,
      //"siteId": 0,
      "state": this.addSiteForm.value.city,
      "gstinUrl":this.gstimageUrl,
      //"updateTime": "2021-01-14T05:31:45.210Z"
    }
    console.log("add site data::", data)
    this.service.showSpinner()
    var url = "account/admin/add-SiteBy-admin"
    this.service.post(url,data).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.router.navigateByUrl('/list-of-sites')
      }
    })
  }

  

}
