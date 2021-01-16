import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Obj: { 'email': any; };
  ipAddress: any;
  location: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public service: MainService) { }

  ngOnInit() {
    this.formValidation()
    this.getIp()
  }

  // =======form validation====/
  formValidation() {
    this.loginForm = new FormGroup({
      'phoneNo': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'rememberMe': new FormControl(''),
    })
    if (localStorage.getItem('rememberMe')) {
      let adminData = JSON.parse(localStorage.getItem('rememberMe'))
      this.loginForm.patchValue({
        'phoneNo': adminData.phoneNo,
        'password': window.atob(adminData.password),
        'rememberMe': adminData.rememberMe
      })
    }
  }

  //---------------------IP api integration --------------------//
  getIp() {
    this.service.getThirdPartyApi('https://jsonip.com/').subscribe((res) => {
      console.log(res)
      if (res['status'] == 200) {
        this.ipAddress = res.body['ip'];
        localStorage.setItem('ipAddress', JSON.stringify(this.ipAddress))
        this.getLocation()
      }
    }, err => { })
  }

  //---------------------------- Location api integration---------------------//
  getLocation() {
    this.service.getThirdPartyApi(`https://try.readme.io/http://www.geoplugin.net/json.gp?ip=${this.ipAddress}`).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        this.location = res.body['geoplugin_countryName'];
        localStorage.setItem('location', JSON.stringify(this.location))
      }
    }, err => { })
  }

  // ---------------------- login ------------------------- //
  login() {
    let apiReqData = {
      phoneNo: this.loginForm.value.phoneNo,
      password: this.loginForm.value.password,
      userAgent: navigator.userAgent,
      location: this.location,
      ipAddress: this.ipAddress
    }
    this.service.showSpinner()
    this.service.post('auth', apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == '200') {
        localStorage.setItem('Auth', res['data']['token']);
        this.service.toasterSucc(res['message'])
        //  this.myAccountApi()
        this.router.navigate(['/dashboard']);
        if (this.loginForm.value.rememberMe == true) {
          let remData = {
            "phoneNo": this.loginForm.value.phoneNo,
            "password": window.btoa(this.loginForm.value.password),
            "rememberMe": this.loginForm.value.rememberMe,
          }
          localStorage.setItem('rememberMe', JSON.stringify(remData))
        } else {
          localStorage.removeItem('rememberMe')
        }
        this.service.changeLoginSub('login');
      }
    }, (err: any) => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.toasterErr(err['error']['message']);
        localStorage.removeItem('data');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    }
    )
    this.Obj = {
      //  'email' : this.loginForm.value.email,
      'email': this.loginForm.value.phoneNo
    }
    localStorage.setItem('data', JSON.stringify(this.Obj));
  }

  //--------------------myAccount api integrate ----------------------//
  myAccountApi() {
    this.service.get(`account/my-account?userId=${localStorage.getItem('Auth')}`).subscribe(res => {
      if (res['status'] == 200) {
        console.log(res)
      }
    }, err => {
      if (err.ststus == 400 || 401) {
        this.service.toasterErr(err.error.message)
      }
    })
  }

  //--------------------------navigate forget Password -----------------//
  forgotPassword() {
    this.router.navigateByUrl('forgot-password')
  }

}
