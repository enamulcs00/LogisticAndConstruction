import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(public service: MainService,public router:Router) { }

  ngOnInit() {
    this.token = window.location.href.split('=')[1];
    
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('',Validators.required),
      confirmPassword : new FormControl('',Validators.required)      
    })
  }

  
  // Reset Password Functionality
  resetPasswordFunc(){
    var apireq = {
      // 'email':localStorage.getItem('email'),
      'password': this.resetPasswordForm.value.password,
      'token': this.token
    }
    this.service.showSpinner();
    this.service.post('api/v1/admin/resetPassword',apireq).subscribe((res : any)=>{
      console.log('reset')
      this.service.hideSpinner();
      if(res['status'] == 200 || 205){
        console.log(res)
        this.service.toasterSucc(res['message']);
        // this.router.navigateByUrl('/login')
        this.service.onLogout()
      }
    },  (err : any)=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.toasterErr(err['error']['message']);
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })

    
  }
}
  
