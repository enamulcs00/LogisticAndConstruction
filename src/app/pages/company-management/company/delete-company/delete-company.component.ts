import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

declare var $: any
@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {
  deleteCompanyForm: FormGroup;
  userId: any;
  companyDetails: any;
  aadharimageUrl: any;
  panimageUrl: any;
  gstimageUrl: any;
  email: any;
  constructor(private router: Router, public service: MainService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
    this.deleteCompanyFormValidation()
    this.getCompanyDetails()
  }


  deleteCompanyFormValidation() {
    this.deleteCompanyForm = new FormGroup({
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

        this.deleteCompanyForm.patchValue({
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

  delete() {
      $('#deleteModal').modal('show')
  }
  deleteCompany(){
      this.service.showSpinner()
      var url="account/admin/delete-client-details?userIdToDeleteClient=" + this.userId
      this.service.get(url).subscribe((res:any)=>{
        this.service.hideSpinner()
        if (res['status'] == 200) {
         this.service.toasterSucc('Deleted successfully')
         this.router.navigateByUrl('/list-of-companies')
        } 
      })
    }
  
    cancel(){
      this.router.navigateByUrl('/list-of-companies')
    }
}
