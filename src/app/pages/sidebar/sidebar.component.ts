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
  tag1: boolean = true;
  tag2: boolean = false;
  isLoggedIn: boolean;
  userDetail: any = {};
  getperm: any;
  getrole: any;
  role: any
  getpermission: any;
  staticflag: boolean = false;
  staticusermgmt: boolean = false;
  staticfeemgmt: boolean = false;
  staticwalletmgmt: boolean = false;
  statickycmgmt: boolean = false;
  statichotcoldmgmt: boolean = false;
  permissionList: any;
  flag: boolean = false;
  staticsetmgmt: boolean = false;
  staticticmgmt: boolean = false;
  staticdasmgmt: boolean = false;
  statictokmgmt: boolean = false;
  staticsubmgmt: boolean = false;

  staticFaqmgmt: boolean;
  showLogo: boolean = false;
  statictransmgmt: boolean = false;
  userID: any;
  previlage: any;
  profile: any;
  currentText: any;
  profileData: any;
  constructor(private routes: Router, public service: MainService) {
    routes.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currUrl = event.url.split('/')[1];
        console.log("current url", this.currUrl)
        if (localStorage.data) {
          console.log('hh', localStorage.data);

          this.service.changeLoginSub('login')
          // if ((this.currUrl == `login` || this.currUrl == `reset-password` || this.currUrl == ``)) {
          if ((this.currUrl == `login` || this.currUrl == ``)) {
            // this.routes.navigate([`/list_of_companies`])
            this.routes.navigate([`/dashboard`])
          }
        } else {
          console.log("else url", this.currUrl)

          if (!(this.currUrl == `login` || this.currUrl.includes(`reset-password`) || this.currUrl.includes(`forgot-password`) || this.currUrl == ``)) {
            console.log("else if url", this.currUrl)

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

        // this.myProfile();
        this.showText();
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
  showText() {
    if (this.currUrl == `dashboard`) {
      this.currentText = 'Dashboard'
    }
    // if(this.currUrl==`list_of_companies` || this.currUrl ==`list_of_companies`){
    if (this.currUrl == `list-of-companies`) {
      this.currentText = 'List of Companies';
    }
    if (this.currUrl == `add-company`) {
      this.currentText = 'Add New Company'
    }
    if (this.currUrl == `view-company`) {
      this.currentText = 'View Company'
    }
    if (this.currUrl == `delete-company`) {
      this.currentText = 'Delete Company'
    }
    // if(this.currUrl==`list_of_sites`){
    if (this.currUrl == `list-of-sites`) {
      this.currentText = 'List of Sites';
    }
    // if(this.currUrl==`company_user_management`){
    if (this.currUrl == `list-of-company-user`) {
      this.currentText = 'User Management';
    }
    // if(this.currUrl==`my_booking`){
    if (this.currUrl == `list-of-company-booking`) {
      this.currentText = 'Bookings';
    }
    if (this.currUrl == `view-company-booking`) {
      this.currentText = 'View Booking';
    }
    // if(this.currUrl==`quotes`){
    if (this.currUrl == `list-of-company-quote`) {
      this.currentText = 'Quotes';
    }
    if (this.currUrl == `view-company-quote`) {
      this.currentText = 'View Quote';
    }
    // if(this.currUrl==`billing`){
    if (this.currUrl == `list-of-company-billing`) {
      this.currentText = 'Billing';
    }
    if (this.currUrl == `view-company-billing`) {
      this.currentText = 'View Billing';
    }

    // if(this.currUrl==`list_of_fleet_owner`){
    if (this.currUrl == `list-of-fleet-owner`) {
      this.currentText = 'List Of Fleet Owners';
    }
    if (this.currUrl == `add-fleet-owner`) {
      this.currentText = 'Add New Fleet Owner';
    }
    // if(this.currUrl==`list_of_truck`){
    if (this.currUrl == `list-of-truck`) {
      this.currentText = 'List Of Trucks';
    }
    if (this.currUrl == `list_of_bid_by_fleet`) {
      this.currentText = 'Bids';
    }
    if (this.currUrl == `list_of_booking_details`) {
      this.currentText = 'Bookings';
    }
    // if(this.currUrl==`list_of_driver`){
    if (this.currUrl == `list-of-driver`) {
      this.currentText = 'Drivers List';
    }

    // if(this.currUrl==`list_of_supplier`){
    if (this.currUrl == `list-of-supplier`) {
      this.currentText = 'List Of Suppliers';
    }
    // if(this.currUrl==`my_booking_supplier`){
    if (this.currUrl == `list-of-supplier-booking`) {
      this.currentText = 'Client Bookings';
    }
    // if(this.currUrl==`quotes_supplier`){
    if (this.currUrl == `list-of-supplier-quote`) {
      this.currentText = 'Company Quotes';
    }
    // if(this.currUrl==`billing_supplier`){
    if (this.currUrl == `list-of-supplier-billing`) {
      this.currentText = 'Billing';
    }
    if (this.currUrl == `list-of-bid-by-fleet-owner-supplier`) {
      this.currentText = 'Fleet Owner Bids';
    }
    if (this.currUrl == `list_of_booking_details_fleet`) {
      this.currentText = 'Fleet Owner Bookings';
    }
    if (this.currUrl == `billing_fleet`) {
      this.currentText = 'Billing';
    }

    // if(this.currUrl==`add_truck_type`){
    if (this.currUrl == `truck-type`) {
      this.currentText = 'Truck Types';
    }
    // if(this.currUrl==`add_material`){
    if (this.currUrl == `materials`) {
      this.currentText = 'Materials';
    }
    // if(this.currUrl==`add_thermal_plants`){
    if (this.currUrl == `thermal-plants`) {
      this.currentText = 'Thermal Plants';
    }
    // if(this.currUrl==`add_crushers_and_mining_info`){
    if (this.currUrl == `crushers-and-mining`) {
      this.currentText = 'Crushers And Mining Info';
    }
    if (this.currUrl == `signup_data`) {
      this.currentText = 'List Of Companies';
    }
    // if(this.currUrl==`add_contact_us`){
    if (this.currUrl == `contact-us`) {
      this.currentText = 'Contact No And E-Mail ID';
    }
    // if(this.currUrl==`terms_and_conditions`){
    if (this.currUrl == `terms-and-conditions`) {
      this.currentText = 'Terms And Conditions';
    }
    // if(this.currUrl==`PrivacyPolicy`){
    if (this.currUrl == `privacy-policy`) {
      this.currentText = 'Privacy Policy';
    }
    if (this.currUrl == `change-password`) {
      this.currentText = 'Change Password';
    }
  }

  // My Profile Functionality
  myProfile() {
    var url = 'account/my-account';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userDetail = res['data'];
        this.profile = this.userDetail.imageUrl;
        this.userID = res['data'].userId;
        this.previlage = res['data'].previlage;
        this.role = res['data'].role;
        localStorage.setItem('userId', this.userID);
        localStorage.setItem('permission', this.previlage);
        localStorage.setItem('usertype', this.role);
        this.getrole = (localStorage.getItem('usertype'))
        this.getpermission = (localStorage.getItem('permission'))
        this.permissionList = this.getpermission.split(",");

        if (this.getrole == "SUBADMIN") {
          this.flag = true;

        }
        for (let i = 0; i < this.permissionList.length; i++) {
          if (this.permissionList[i] == "STATIC_CONTENT") {
            this.staticflag = true
          }
          if (this.permissionList[i] == "FLEET_MANAGEMENT") {
            this.staticusermgmt = true
          }

          if (this.permissionList[i] == "WALLET_MANAGEMENT") {
            this.staticwalletmgmt = true
          }

          if (this.permissionList[i] == "KYC_MANAGEMENT") {
            this.statickycmgmt = true
          }

          if (this.permissionList[i] === "TOKEN_MANAGEMENT") {
            this.statictokmgmt = true
          }

          if (this.permissionList[i] === "TRANSCATION_MANAGEMENT") {
            this.statictransmgmt = true
          }
          if (this.permissionList[i] === "SUBADMIN_MANAGEMENT") {
            this.staticsubmgmt = true
          }
          // if(this.permissionList[i]==="Company_management"){
          if (this.permissionList[i] === "dashboard") {
            this.staticdasmgmt = true
          }


        }




      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {

      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
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
    // window.location.reload();
    this.routes.navigate(['/login']);
  }

}
