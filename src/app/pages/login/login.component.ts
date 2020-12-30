import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  Obj: { 'email': any; };
  ipAddress: any;
  location: any;

  constructor(
    private router : Router,

    private fb: FormBuilder,
    private http : HttpClient,
    public service : MainService
    ) { }

  ngOnInit() {
    this.formValidation()
    this.getIp()
}

// =======form validation====/
formValidation(){
  this.loginForm= new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
    'password': new FormControl('',[Validators.required]),
    'rememberMe': new FormControl('',[Validators.required]),
  })
}
//---------------------IP api integration --------------------//
getIp(){
  this.service.getThirdPartyApi('https://jsonip.com/').subscribe((res)=>{
    console.log(res)
    if(res['status'] == 200) {
      this.ipAddress=res.body['ip'];
      localStorage.setItem('ipAddress',JSON.stringify(this.ipAddress))
      this.getLocation()
    }
  },err=>{})
}
//----------------------------Location api integration---------------------//
getLocation(){
  this.service.getThirdPartyApi(`https://try.readme.io/http://www.geoplugin.net/json.gp?ip=${this.ipAddress}`).subscribe(res=>{
    console.log(res)
    if(res['status'] == 200){
      this.location=res.body['geoplugin_countryName'];
      localStorage.setItem('location',JSON.stringify(this.location))
    }
  },err=>{})
}
//--------------------------navigate forget Password -----------------//
forgotPassword() {
  this.router.navigateByUrl('forgot-password')
}

 
login(){
  // localStorage.setItem('Auth','token');
  // localStorage.setItem('data','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaC1yYWtlc2hrdW1hckBtb2JpbG9pdHRlLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwicm9sZSI6IkFETUlOIiwiYXV0aGVudGljYXRlZCI6dHJ1ZSwidXNlcklkIjoyLCJ1c2VybmFtZSI6InBoLXJha2VzaGt1bWFyQG1vYmlsb2l0dGUuY29tIiwiaWF0IjoxNjA1NTA4MTcwLCJleHAiOjE2MDU1OTQ1NzB9.0KrFklXTfXLFVmqCJvlJju2ymWGiVefgltkPQXGWkR3vJe1wg35pCTBSiRylxmsQZ6C6jcuWvb5NSKej7aRhDg');
  // this.router.navigate(['/dashboard']);
  this.service.showSpinner()
  this.service.post('api/v1/admin/login', {
    email : this.loginForm.value.email,
    password : this.loginForm.value.password,
    userAgent: navigator.userAgent,
    location:this.location,
    ipAddress:this.ipAddress
  }).subscribe(
    (res : any)=>{
     this.service.hideSpinner()
     console.log("res:::::", res)
       if(res['responseCode'] == '200'){
       localStorage.setItem('Auth',res['result']['token']);
       console.log(res)
       this.service.toasterSucc(res['message'])
      //  this.myAccountApi()

       if(this.loginForm.value.rememberMe==true){
        let remData={
          "email":this.loginForm.value.email,
          // "password":window.btoa(this.loginForm.value.password)
        }
        localStorage.setItem('rememberMe',JSON.stringify(remData))
  
    }

       this.service.changeLoginSub('login');
        this.router.navigate(['dashboard']);
       }
    },
    (err : any)=>{
      
      this.service.hideSpinner();
      if(err['responseCode']=='401'){
        this.service.toasterErr(err['error']['message']);
        localStorage.removeItem('data');
        console.log(err)
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    }
  )
this.Obj={
 'email' : this.loginForm.value.email,

}
  localStorage.setItem('data',JSON.stringify(this.Obj));
  
}

//--------------------myAccount api integrate ----------------------//
myAccountApi(){
  this.service.get(`account/my-account?userId=${localStorage.getItem('Auth')}`).subscribe(res=>{
    if(res['status'] == 200){
      console.log(res)
    }
  },err=>{
    if(err.ststus == 400 || 401){
      this.service.toasterErr(err.error.message)
    }
  })
}


}
