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
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'siteLocation': new FormControl('', [Validators.required]),
      'siteAddress': new FormControl('', [Validators.required]),
      'siteName': new FormControl('',),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'gstNo': new FormControl('',),
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
      "fkcompanyId": this.addSiteForm.value.companyName,
      "gstinNo": this.addSiteForm.value.gstNo,
     // "isDeleted": true,
     // "isEnable": true,
      "locationAddress": this.addSiteForm.value.siteLocation,
      "siteAddress": this.addSiteForm.value.siteAddress,
      "state": this.addSiteForm.value.city,
      "gstinUrl":this.gstimageUrl,
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
