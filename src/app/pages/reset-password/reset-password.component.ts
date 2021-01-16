import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup
  clientId: any;
  resetParamData: any;
  roleArray: any = ['COMPANY', 'FLEET', 'SUPPLIER', 'DRIVER'];

  constructor(
    private router: Router, public service: MainService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.resetParamData = JSON.parse(res.paramData)
      console.log(this.resetParamData)
    })
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'mobileNo': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required),
    })
    this.resetPasswordForm.patchValue({
      'email': this.resetParamData.email ? this.resetParamData.email : '',
      'mobileNo': this.resetParamData.mobileNo ? this.resetParamData.mobileNo : '',
      'role': this.resetParamData.role ? this.resetParamData.role : '',
    })
    this.clientId = this.resetParamData.clientId
    this.resetPasswordForm.disable()
  }

  // reset password
  ResetPassword() {
    // let obj = {
    //   clientId: this.clientId,
    //   email: this.resetPasswordForm.value.email,
    //   mobileNo: this.resetPasswordForm.value.mobileNo,
    //   role: this.resetPasswordForm.value.role
    // }
    if (this.resetParamData.role == 'DRIVER') {
      var url = `account/admin/forget-password-other-role?clientId=${this.clientId}&mobileNo=${this.resetPasswordForm.value.mobileNo}&role=${this.resetPasswordForm.value.role}`
    } else {
      var url = `account/admin/forget-password-other-role?clientId=${this.clientId}&email=${this.resetPasswordForm.value.email}&mobileNo=${this.resetPasswordForm.value.mobileNo}&role=${this.resetPasswordForm.value.role}`
    }
    console.log(url)
    this.service.showSpinner()
    this.service.post(url, '').subscribe((res: any) => {
      console.log('reset response==>', res);
      this.service.hideSpinner()
      if (res.status == 200) {
        this.service.toasterSucc(res.message)
        switch (this.resetParamData.role) {
          case 'COMPANY':
            this.router.navigate(['/list-of-companies'])
            break;
          case 'FLEET':
            this.router.navigate(['/list-of-fleet-owner'])
            break;
          case 'SUPPLIER':
            this.router.navigate(['/list-of-supplier'])
            break;
          case 'DRIVER':
            this.router.navigate(['/list-of-driver'])
            break;
          default:
            this.router.navigate(['/dashboard'])
            break
        }
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterSucc('Something went wrong.')
      // this.router.navigate(['/list-of-supplier'])
    })
  }

}

