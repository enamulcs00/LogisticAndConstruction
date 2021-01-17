import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-edit-sites',
  templateUrl: './edit-sites.component.html',
  styleUrls: ['./edit-sites.component.css']
})
export class EditSitesComponent implements OnInit {

  editSiteForm: FormGroup;
  listing: any = [];
  userId: any;
  gstimageUrl: any;
  companyNameArr: any=[];
  companylisting: any=[];
  stateArr: any=[];
  selectedState: any;
  cityArr: any=[];

  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
    this.editSiteFormValidation()
    this.viewDetails()
    this.getCompanyNameList()
    this.getStateList()
  }

   // add site form validation
   editSiteFormValidation() {
    this.editSiteForm = new FormGroup({
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

  viewDetails(){
    this.service.showSpinner()
    var url="account/admin/get-SiteBy-admin?siteId="+this.userId
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data'];
        this.gstimageUrl = this.listing.gstinUrl
        this.editSiteForm.patchValue({
         
          'companyName': this.listing.companyName,
          'siteLocation' :this.listing.locationAddress,
          'siteAddress': this.listing.siteAddress,
          'address':this.listing.locationAddress,
          'city': this.listing.city,
          'state': this.listing.state,
          'gstNo': this.listing.gstinNo,
          
          
        })
         
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

  getCompanyNameList(){
    this.service.showSpinner()
    var url="account/admin/filter-user-details?roleStatus="+'COMPANY'
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.companylisting = res['data']['list'];
        this.companylisting.forEach(element => {
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

  update(){
    let data= {
       "city": this.editSiteForm.value.city,
       "companyName": this.editSiteForm.value.companyName,
       "gstinNo": this.editSiteForm.value.gstNo,
      // "isDeleted": true,
      // "isEnable": true,
       "siteId": this.userId, 
       "locationAddress": this.editSiteForm.value.siteLocation,
       "siteAddress": this.editSiteForm.value.siteAddress,
       "state": this.editSiteForm.value.state,
       "gstinUrl":this.gstimageUrl,
     }
     console.log("add site data::", data)
     this.service.showSpinner()
     var url = "account/admin/edit-SiteBy-admin"
     this.service.post(url,data).subscribe((res: any) => {
       this.service.hideSpinner()
       if (res['status'] == 200) {
         this.service.toasterSucc(res['message'])
         this.router.navigateByUrl('/list-of-sites')
       }
     })
   }

}
