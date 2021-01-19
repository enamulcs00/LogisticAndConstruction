import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-view-company-user',
  templateUrl: './view-company-user.component.html',
  styleUrls: ['./view-company-user.component.css']
})
export class ViewCompanyUserComponent implements OnInit {
  viewCompanyUserForm: FormGroup;
  userId: any;
  companyUserDetails: any;
  email: any;
  role: any;
  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
       });
    this.viewCompanyUserFormValidation()
    this.getCompanyUserDetails()
  }

  viewCompanyUserFormValidation() {
    this.viewCompanyUserForm = new FormGroup({
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
      
        this.viewCompanyUserForm.patchValue({
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
  edit(){
    this.router.navigate(['/edit-company-user',this.userId])
  }

  back(){
    this.router.navigateByUrl('/list-of-company-user')
  }
  
}
