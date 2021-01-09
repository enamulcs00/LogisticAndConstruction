import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  email: any;
  isTrue: boolean = true
  // @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  // config = {
  //   allowNumbersOnly: false,
  //   length: 5,
  //   isPasswordInput: false,
  //   disableAutoFocus: false,
  //   placeholder: '',
  //   inputStyles: {
  //     'width': '50px',
  //     'height': '50px'
  //   }
  // };
  // otp: any;

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
    this.forgotPasswordFormValidation()
  }

  // ------- form validation ---------- //
  forgotPasswordFormValidation() {
    this.forgotPasswordForm = new FormGroup({
      'phoneNo': new FormControl(''),
      'email': new FormControl('', Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)),
    })
  }

  // ----------- form submit ----------- //
  forgotPassword() {
    // http://182.72.203.244:4034/admin/forget-password?mobileNo=A8871860523
    // var url = "admin/forget-password"
    if(this.forgotPasswordForm.value.phoneNo){
      // var url = `admin/forget-password?mobileNo=${this.forgotPasswordForm.value.phoneNo}`
      var url = `account/admin/forget-password?mobileNo=${this.forgotPasswordForm.value.phoneNo}`


    }else{
      // var url = `admin/forget-password?email=${this.forgotPasswordForm.value.email}`
      var url = `account/admin/forget-password?email=${this.forgotPasswordForm.value.email}`

    }
    // let data = {
    //   "email": this.forgotPassword.value.email
    // }
    this.service.post(url, {}).subscribe(res => {
      if (res['status'] == 200) {
        localStorage.setItem('email', JSON.stringify(this.email))
        console.log(res)
        this.service.toasterSucc("Kindly check your email to recover your password.")
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.toasterErr(err['error']['message']);
      } else {
        this.service.toasterErr('Email address is not registered');
      }
    });
  }

  // onResend(){
  //   if(this.forgotPassword.value.email){
  //     this.onForgot();
  //   }
  //   else{
  //     this.service.toasterErr('Registered email address required so that we can send you reset instruction')
  //   }

  // }


  // onOtpChange(e) {
  //   this.otp = e;
  // }
}


