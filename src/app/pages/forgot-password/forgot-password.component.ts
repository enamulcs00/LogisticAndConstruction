import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  email: any;

  constructor(
    private router : Router,
     public service:MainService
  ) { }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      'email': new FormControl('',Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)),
    })
  }

  
onForgot(){  
 
   var url = "api/v1/admin/forgotPassword"
   let data={
    "email" : this.forgotPassword.value.email
   }
    this.service.post(url,data).subscribe(res=>{
      if(res['status']== 200){
        localStorage.setItem('email',JSON.stringify(this.email))
        console.log(res)
        this.service.toasterSucc("Kindly check your email to recover your password.")
      }
      
    },err=>{
    
      this.service.hideSpinner(); 
      
      if(err['status']=='401'){
        this.service.toasterErr(err['error']['message']);
      }else{
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


}


