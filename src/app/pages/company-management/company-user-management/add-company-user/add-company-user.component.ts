import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-company-user',
  templateUrl: './add-company-user.component.html',
  styleUrls: ['./add-company-user.component.css']
})
export class AddCompanyUserComponent implements OnInit {
  addCompanyUserForm: FormGroup;
  companyNameArr: any=[];
  companylisting: any=[];
  selectedCompany: any;
  siteArr: any=[];
  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addCompanyUserFormValidation()
    this.getCompanyNameList()
  }

  addCompanyUserFormValidation() {
    this.addCompanyUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'companyName': new FormControl('', [Validators.required]),
      'userType': new FormControl('', [Validators.required]),
     
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

  submitForm() {
    let apiReqData = {
     
     
      //"companyName": this.addCompanyUserForm.value.companyName,
      "companyId": this.addCompanyUserForm.value.companyName,
      "email": this.addCompanyUserForm.value.email,
      "firstName": this.addCompanyUserForm.value.firstName,
      "lastName": this.addCompanyUserForm.value.lastName,
      "roleStatus": this.addCompanyUserForm.value.userType,
      "phoneNo": '+91' + this.addCompanyUserForm.value.phoneNo,
      "pnWithoutCountryCode": this.addCompanyUserForm.value.phoneNo,
      "countryCode": "+91",
    }
    console.log("data", apiReqData)
    this.service.showSpinner()
    var url = "account/admin/add-CompanyBy-admin"
    this.service.post(url,apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc('Company user added successfully.')
        this.router.navigateByUrl('/list-of-company-user')
        //this.stateArr = res['data'];
      }
    })
  }


}
