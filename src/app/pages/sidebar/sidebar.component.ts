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
        // console.log("current url", this.currUrl)
        if (localStorage.data) {
          // console.log('hh', localStorage.data);
          this.service.changeLoginSub('login')
          // if ((this.currUrl == `login` || this.currUrl == `reset-password` || this.currUrl == ``)) {
          if ((this.currUrl == `login` || this.currUrl == ``)) {
            // this.routes.navigate([`/list_of_companies`])
            this.routes.navigate([`/dashboard`])
          }
        } else {
          // console.log("else url", this.currUrl)
          if (!(this.currUrl == `login` || this.currUrl.includes(`reset-password`) || this.currUrl.includes(`forgot-password`) || this.currUrl == ``)) {
            // console.log("else if url", this.currUrl)
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
    // company
    if (this.currUrl == `list-of-companies`) {
      this.currentText = 'List of Companies';
    }
    if (this.currUrl == `add-company`) {
      this.currentText = 'Add New Company'
    }
    if (this.currUrl == `view-company`) {
      this.currentText = 'View Company'
    }
    if (this.currUrl == `edit-company`) {
      this.currentText = 'Edit Company'
    }
    if (this.currUrl == `delete-company`) {
      this.currentText = 'Delete Company'
    }

    // site
    if (this.currUrl == `list-of-sites`) {
      this.currentText = 'List of Sites';
    }
    if (this.currUrl == `add-site`) {
      this.currentText = 'Add Site';
    }
    if (this.currUrl == `view-site`) {
      this.currentText = 'View Site';
    }
    if (this.currUrl == `edit-site`) {
      this.currentText = 'Edit Site';
    }
    if (this.currUrl == `delete-site`) {
      this.currentText = 'Delete Site';
    }

    // company-user
    if (this.currUrl == `list-of-company-user`) {
      this.currentText = 'User Management';
    }
    if (this.currUrl == `add-company-user`) {
      this.currentText = 'Add New User';
    }
    if (this.currUrl == `view-company-user`) {
      this.currentText = 'View User';
    }
    if (this.currUrl == `edit-company-user`) {
      this.currentText = 'Edit User';
    }
    if (this.currUrl == `delete-company-user`) {
      this.currentText = 'Delete User';
    }
    // company booking
    if (this.currUrl == `list-of-company-booking`) {
      this.currentText = 'Bookings';
    }
    if (this.currUrl == `view-company-booking`) {
      this.currentText = 'View Booking';
    }

    // company quote
    if (this.currUrl == `list-of-company-quote`) {
      this.currentText = 'Quotes';
    }
    if (this.currUrl == `view-company-quote`) {
      this.currentText = 'View Quote';
    }

    // company billing
    if (this.currUrl == `list-of-company-billing`) {
      this.currentText = 'Billing';
    }
    if (this.currUrl == `view-company-billing`) {
      this.currentText = 'View Billing';
    }

    // ----------------- fleet owner ------------------------------ //
    if (this.currUrl == `list-of-fleet-owner`) {
      this.currentText = 'List Of Fleet Owners';
    }
    if (this.currUrl == `add-fleet-owner`) {
      this.currentText = 'Add New Fleet Owner';
    }
    if (this.currUrl == `routes`) {
      this.currentText = 'Routes';
    }
    if (this.currUrl == `view-fleet-owner`) {
      this.currentText = 'View Fleet Owner';
    }
    if (this.currUrl == `edit-fleet-owner`) {
      this.currentText = 'Edit Fleet Owner';
    }
    if (this.currUrl == `delete-fleet-owner`) {
      this.currentText = 'Delete Fleet Owner';
    }

    // ------------------ truck ------------------ //
    if (this.currUrl == `list-of-truck`) {
      this.currentText = 'List Of Trucks';
    }
    if (this.currUrl == `add-truck`) {
      this.currentText = 'Add Truck';
    }
    if (this.currUrl == `view-truck`) {
      this.currentText = 'View Truck';
    }
    if (this.currUrl == `edit-truck`) {
      this.currentText = 'Edit Truck';
    }
    if (this.currUrl == `delete-truck`) {
      this.currentText = 'Delete Truck';
    }
    // ------------------ bid by fleet owner ------------- //
    if (this.currUrl == `list-of-bid-by-fleet-owner`) {
      this.currentText = 'Bids';
    }
    if (this.currUrl == `view-bid-by-fleet-owner`) {
      this.currentText = 'View Bids';
    }
    // fleet booking
    if (this.currUrl == `list-of-fleet-owner-booking`) {
      this.currentText = 'Bookings';
    }
    if (this.currUrl == `view-fleet-owner-booking`) {
      this.currentText = 'View Bookings';
    }
    // fleet billing
    if (this.currUrl == `list-of-fleet-owner-billing`) {
      this.currentText = 'Billing';
    }
    if (this.currUrl == `view-fleet-owner-billing`) {
      this.currentText = 'View Billing';
    }
    // ------------------ driver -------------- //
    if (this.currUrl == `list-of-driver`) {
      this.currentText = 'Drivers List';
    }
    if (this.currUrl == `add-driver`) {
      this.currentText = 'Add Driver';
    }
    if (this.currUrl == `view-driver`) {
      this.currentText = 'View Driver';
    }
    if (this.currUrl == `edit-driver`) {
      this.currentText = 'Edit Driver';
    }
    if (this.currUrl == `delete-driver`) {
      this.currentText = 'Delete Driver';
    }

    // ----------------- supplier ---------------- //
    if (this.currUrl == `list-of-supplier`) {
      this.currentText = 'List Of Suppliers';
    }
    if (this.currUrl == `add-supplier`) {
      this.currentText = 'Add Suppliers';
    }
    if (this.currUrl == `view-supplier`) {
      this.currentText = 'View Suppliers';
    }
    if (this.currUrl == `edit-supplier`) {
      this.currentText = 'Edit Suppliers';
    }
    if (this.currUrl == `delete-supplier`) {
      this.currentText = 'Delete Suppliers';
    }

    // supplier booking
    if (this.currUrl == `list-of-supplier-booking`) {
      this.currentText = 'Client Bookings';
    }
    if (this.currUrl == `view-supplier-booking`) {
      this.currentText = 'View Bookings';
    }

    // supplier quote
    if (this.currUrl == `list-of-supplier-quote`) {
      this.currentText = 'Company Quotes';
    }
    if (this.currUrl == `view-supplier-quote`) {
      this.currentText = 'View Quotes';
    }

    // supplier billing
    if (this.currUrl == `list-of-supplier-billing`) {
      this.currentText = 'Billing';
    }
    if (this.currUrl == `view-supplier-billing`) {
      this.currentText = 'View Billing';
    }

    // supplier fleet owner bid
    if (this.currUrl == `list-of-bid-by-fleet-owner-supplier`) {
      this.currentText = 'Fleet Owner Bids';
    }
    if (this.currUrl == `view-bid-by-fleet-owner-supplier`) {
      this.currentText = 'View Fleet Owner Bids';
    }
    // supplier fleet owner billing
    if (this.currUrl == `list-of-fleet-owner-billing-supplier`) {
      this.currentText = 'Fleet Owner Billing';
    }
    if (this.currUrl == `view-fleet-owner-billing-supplier`) {
      this.currentText = 'View Fleet Owner Billing';
    }

    // supplier fleet owner booking
    if (this.currUrl == `list-of-fleet-owner-booking-supplier`) {
      this.currentText = 'Fleet Owner Booking';
    }
    if (this.currUrl == `view-fleet-owner-booking-supplier`) {
      this.currentText = 'View Fleet Owner booking';
    }

    // truck type
    if (this.currUrl == `truck-type`) {
      this.currentText = 'Truck Types';
    }

    // material
    if (this.currUrl == `materials`) {
      this.currentText = 'Materials';
    }

    // thermal plant
    if (this.currUrl == `thermal-plants`) {
      this.currentText = 'Thermal Plants';
    }

    // crusher and mining
    if (this.currUrl == `crushers-and-mining`) {
      this.currentText = 'Crushers And Mining Info';
    }

    // signup data
    if (this.currUrl == `signup-data`) {
      this.currentText = 'List Of Companies';
    }

    // contact us
    if (this.currUrl == `contact-us`) {
      this.currentText = 'Contact No And E-Mail ID';
    }

    // terms and conditions
    if (this.currUrl == `terms-and-conditions`) {
      this.currentText = 'Terms And Conditions';
    }

    // privacy and policy
    if (this.currUrl == `privacy-policy`) {
      this.currentText = 'Privacy Policy';
    }
    // change passsword
    if (this.currUrl == `change-password`) {
      this.currentText = 'Change Password';
    }
    // reset password
    if (this.currUrl == `reset-password`) {
      this.currentText = 'Reset Password';
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
