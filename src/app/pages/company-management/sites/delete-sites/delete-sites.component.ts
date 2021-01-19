import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var $: any
@Component({
  selector: 'app-delete-sites',
  templateUrl: './delete-sites.component.html',
  styleUrls: ['./delete-sites.component.css']
})
export class DeleteSitesComponent implements OnInit {
  viewSiteForm: FormGroup;
  listing: any = [];
  userId: any;
  gstimageUrl: any;

  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
    this.viewSiteFormValidation()
    this.viewDetails()
  }

   // add site form validation
   viewSiteFormValidation() {
    this.viewSiteForm = new FormGroup({
     
      'companyName': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'dateOfCreation': new FormControl('', [Validators.required]),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'gstNo': new FormControl('', [Validators.required]),
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
        this.viewSiteForm.patchValue({      
          'companyName': this.listing.companyName,
          'address':this.listing.locationAddress,
          'city': this.listing.city,
          'state': this.listing.state,
          'gstNo': this.listing.gstinNo,
          'dateOfCreation':this.listing.createTime
        })   
      }
     
    })
  }

  delete(){
    $('#deleteModal').modal('show')
  }

  deleteSite(val){
    console.log("value", val)
    let data= {
       "isDeleted": val,
       "siteId": this.userId, 
     }
  
     this.service.showSpinner()
     var url = "account/admin/ChangeStatus-SiteBy-admin"
     this.service.post(url,data).subscribe((res: any) => {
       this.service.hideSpinner()
       if (res['status'] == 200) {
         this.service.toasterSucc(res['message'])
         this.router.navigateByUrl('/list-of-sites')
       }
     })
   }
   cancel(){
    this.router.navigateByUrl('/list-of-sites')
   }
}
