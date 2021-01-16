import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-edit-company-user',
  templateUrl: './edit-company-user.component.html',
  styleUrls: ['./edit-company-user.component.css']
})
export class EditCompanyUserComponent implements OnInit {

  editCompanyUserForm: FormGroup;
  userId: any;
  companyUserDetails: any;
  email: any;
  role: any;
  companyNameArr: any=[];
  siteArr: any=[];
  selectedCompany: any;
  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
    this.editCompanyUserFormValidation()
    this.getCompanyUserDetails()
    this.getCompanyNameList()
  }

  editCompanyUserFormValidation() {
    this.editCompanyUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'userType': new FormControl('', [Validators.required]),
      'site': new FormControl('',),
     
    })
  }
  getCompanyUserDetails() {
    this.service.showSpinner()
    var url = "account/admin/get-client-details?userIdToGetDetails="+ this.userId
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.companyUserDetails = res['data']['userDetail'];
        this.email = res['data']['email']
        this.role=res['data']['role']['role']
      
        this.editCompanyUserForm.patchValue({
          'firstName': this.companyUserDetails.firstName,
          'lastName':this.companyUserDetails.lastName,
          'phoneNo': this.companyUserDetails.pnWithoutCountryCode,
          'email': this.email,
          'companyName': this.companyUserDetails.companyName,
          'userType':this.role,
          'site': this.companyUserDetails.baseLocationAddress,
          
          
        })
      }
    })
  }
  getCompanyNameList(){
    this.service.showSpinner()
    var url="account/admin/get-company-by-company-name"
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
         this.companyNameArr = res['data'];
      }   
    })
  }

  searchLocation(event) { 
    this.siteArr=[]
    this.service.showSpinner()
    this.selectedCompany = event.target.value
    console.log("event", this.selectedCompany)
    var url = "account/admin/get-location?idOfCompany=" + this.selectedCompany
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.siteArr = res['data'];
      }
    })
  }


  update() {
    let apiReqData = {
     
     
      "companyName": this.editCompanyUserForm.value.companyName,
      "email": this.editCompanyUserForm.value.email,
      "firstName": this.editCompanyUserForm.value.firstName,
      "lastName": this.editCompanyUserForm.value.lastName,
      "roleStatus": this.editCompanyUserForm.value.userType,
      "phoneNo": '+91' + this.editCompanyUserForm.value.phoneNo,
      "pnWithoutCountryCode": this.editCompanyUserForm.value.phoneNo,
      "countryCode": "+91",
      
    }
    console.log("data", apiReqData)
    this.service.showSpinner()
    var url = "account/admin/update-profile-other-role?userIdForUpdateprofile="+this.userId
    this.service.post(url,apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc('Company user updated successfully.')
        this.router.navigateByUrl('/list-of-company-user')
        //this.stateArr = res['data'];
      }
    })
  }

}
