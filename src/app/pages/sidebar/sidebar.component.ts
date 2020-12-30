import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, Event, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currUrl: string;
  tag1: boolean=true;
  tag2 : boolean = false;
  isLoggedIn: boolean;
  userDetail: any = {};
  getperm: any;
  getrole: any;
  role:any
  getpermission: any;
  staticflag: boolean = false;
  staticusermgmt: boolean = false;
  staticfeemgmt: boolean = false;
  staticwalletmgmt: boolean = false;
  statickycmgmt: boolean = false;
  statichotcoldmgmt: boolean = false;
  permissionList: any;
  flag: boolean=false;
  staticsetmgmt: boolean=false;
  staticticmgmt: boolean=false;
  staticdasmgmt: boolean=false;
  statictokmgmt: boolean=false;
  staticsubmgmt: boolean=false;
  
  staticFaqmgmt: boolean;
  showLogo: boolean=false;
  statictransmgmt: boolean=false;
  userID: any;
  previlage: any;
  profile: any;

  constructor(private routes: Router, public service: MainService) {
    routes.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currUrl = event.url.split('/')[1];
        if (localStorage.data) {
          console.log('hh', localStorage.data);
          
          this.service.changeLoginSub('login')
          if ((this.currUrl == `login` || this.currUrl == `forgot-password` || this.currUrl == `reset-password` || this.currUrl == ``)) {
            this.routes.navigate([`/dashboard`])
          }
        } else {
          if (!(this.currUrl == `login` || this.currUrl == `forgot-password` || this.currUrl.includes(`reset-password`) || this.currUrl == ``)) {
            this.routes.navigate([`/login`])
          }
          this.service.changeLoginSub('logout');
        }
      }
    })
  }
  

  ngOnInit() {

    this.service.loginObs.subscribe(response => {
      if (response == 'login') {
        this.isLoggedIn = true;
        console.log('jf', this.isLoggedIn);
        
        this.myProfile();
      }
      else {
        this.isLoggedIn = false;
      }
    })
  }

  head() {
    this.tag1 = !this.tag1;
      // if (document.getElementById("mysidebar").className =="lg-logo") {
      //   document.getElementById("mysidebar").className ="lg-logo1";
      // }
    
      // else if (document.getElementById("mysidebar").className =="lg-logo1") {
      //   document.getElementById("mysidebar").className ="lg-logo";
      // }
      
  }

  // My Profile Functionality
myProfile(){
  var url = 'account/my-account';
  this.service.showSpinner();
  this.service.get(url).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status'] == 200){      
     this.userDetail = res['data'];
     this.profile=this.userDetail.imageUrl;
     this.userID=res['data'].userId;
     this.previlage=res['data'].previlage;
     this.role=res['data'].role;
     localStorage.setItem('userId',this.userID);
     localStorage.setItem('permission',this.previlage);
     localStorage.setItem('usertype',this.role);
     this.getrole=(localStorage.getItem('usertype'))
     this.getpermission=(localStorage.getItem('permission'))
     this.permissionList = this.getpermission.split(",");

     if(this.getrole=="SUBADMIN"){
      this.flag=true;
     
    }
    for (let i = 0; i < this.permissionList.length; i++) {
      if(this.permissionList[i]=="STATIC_CONTENT"){
        this.staticflag=true   
      }
      if(this.permissionList[i]=="USER_MANAGEMENT"){
        this.staticusermgmt=true
      }
      
      if(this.permissionList[i]=="WALLET_MANAGEMENT"){
        this.staticwalletmgmt=true
      }

      if(this.permissionList[i]=="KYC_MANAGEMENT"){
        this.statickycmgmt=true
      }
   
      if(this.permissionList[i]==="TOKEN_MANAGEMENT"){
        this.statictokmgmt=true
      }

      if(this.permissionList[i]==="TRANSCATION_MANAGEMENT"){
        this.statictransmgmt=true
      }
      if(this.permissionList[i]==="SUBADMIN_MANAGEMENT"){
        this.staticsubmgmt=true
      }
      if(this.permissionList[i]==="DASHBOARD"){
        this.staticdasmgmt=true
      }
      

    }
    
    
   
    
    }else {
      this.service.toasterErr(res['message']);
    }
  },err=>{
  
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
}


  

  // logout
  onLogout() {
    localStorage.removeItem('data');
    localStorage.removeItem('Auth');
    localStorage.removeItem('permission');
    localStorage.removeItem('usertype');
    $('#signout_modal').modal('hide');
    window.location.reload();
    this.routes.navigate(['/login']);
  }

}
