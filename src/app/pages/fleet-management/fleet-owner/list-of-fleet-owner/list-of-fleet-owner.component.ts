import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any

@Component({
  selector: 'app-list-of-fleet-owner',
  templateUrl: './list-of-fleet-owner.component.html',
  styleUrls: ['./list-of-fleet-owner.component.css']
})
export class ListOfFleetOwnerComponent implements OnInit {
  listing: any = [];
  userid: number;
  action: any;
  // pagination variable 
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  // search filter variable
  companyName: any = '';
  firstName: any = '';
  state: any = '';
  city: any = '';
  phoneNo: any = '';

  fleetOnwerCompanyNameArray: any = [];
  stateArr: any = []
  selectedState: any;
  cityArr: any = []

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
    this.getlist();
    this.getFleetOwnerlist() // list of fleet owner for search filter
    this.getStateList(); // list of state for search filter
  }

  // ----------------------------- get fleet owner list --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/filter-user-details?roleStatus=FLEET&page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)
      + (this.companyName ? ('&companyName=' + this.companyName) : '') + (this.firstName ? ('&firstName=' + this.firstName) : '')
      + (this.state ? ('&state=' + this.state) : '') + (this.city ? ('&city=' + this.city) : '') + (this.phoneNo ? ('&search=' + this.phoneNo) : '')}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
        this.totalItems = res.data.totalCount
      } else {
        this.listing = []
        this.totalItems = 0
      }
    })
  }

  // ----------- search --------------- //
  search() {
    if (this.companyName || this.firstName || this.state || this.city || this.phoneNo) {
      this.currentPage = 1;
      this.getlist()
    }
  }

  // ------------ reset -------------- //
  reset() {
    if (this.companyName || this.firstName || this.state || this.city || this.phoneNo) {
      this.companyName = ''
      this.firstName = ''
      this.state = ''
      this.city = ''
      this.phoneNo = ''
      this.currentPage = 1
      setTimeout(() => {
        this.getlist()
      }, 200);
    }
  }

  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }


  /**
   * fleet owner list, truck type list
   * show fleet owner list in search filter
   * show state list in search filter
   * get city list on basis of state selected
   */
  //----------------------------- get fleet owner list --------------------------------//
  getFleetOwnerlist() {
    var url = 'account/admin/filter-user-details?roleStatus=FLEET'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.fleetOnwerCompanyNameArray = res['data']['list'];
      }
    })
  }

  // --------- get State list -------------- //
  getStateList() {
    // this.service.showSpinner()
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      // this.service.hideSpinner()
      if (res['status'] == 200) {
        this.stateArr = res['data'];
      }
    })
  }

  // ----------- get city list --------------- //
  searchCity(event) {
    console.log("event", event)
    this.service.showSpinner()
    this.selectedState = event.target.value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.cityArr = res['data'];
      }
    })
  }

  //----------------------- Block Function--------------//
  openModal(action, userId) {
    this.userid = userId;
    this.action = action;
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')

    } else if (action == 'BLOCK') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }

  blockUser() {
    this.service.showSpinner();
    var url = `account/admin/enable-desable-status-by-admin?&userId=${this.userid}&userStatus=${this.action}`;
    this.service.get(url).subscribe((res: any) => {
      if (res.status == 200) {
        this.service.hideSpinner()
        if (this.action == 'BLOCK') {
          $('#block').modal('hide');
          this.service.toasterSucc('User Blocked Successfully.');
        }
        else {
          $('#active').modal('hide');
          this.service.toasterSucc('User Activated Successfully.');
        }
        this.getlist()
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }
      else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // --------------- export to csv ------------------- //
  exportToCsv() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj = {
        "Fleet Owner": element.companyName ? element.companyName : 'N/A',
        "First Name": element.firstName ? element.firstName : 'N/A',
        "Last Name": element.lastName ? element.lastName : 'N/A',
        "Mobile": element.phoneNo ? element.phoneNo : 'N/A',
        "E-Mail": element.email ? element.email : 'N/A',
        "State": element.state ? element.state : 'N/A',
        "GSTIN": element.gstInNo ? element.gstInNo : 'N/A',
        "Date Of Creation": String(element.createTime) ? String(element.createTime).slice(0, 10) : 'N/A',
      }
      dataArr.push(obj)
    })
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'List Of Fleet',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ["Fleet Owner", "First Name", "Last Name", "Mobile", "E-Mail", "State", "GSTIN", "Date Of Creation"]
    };
    new ngxCsv(dataArr, 'List-of-Fleet', options);
  }

  // ------------- add new fleet ----------------- //
  addFleetOwner() {
    this.router.navigate(['add-fleet-owner'])
  }

  // ------------- view fleet owner --------------- //
  viewFleetOwner(userId) {
    this.router.navigate(['/view-fleet-owner', userId])
  }

  // ------------- delete fleet owner --------------- //
  deleteFleetOwner(userId) {
    this.router.navigate(['/delete-fleet-owner', userId])
  }

  // ------------- reset password ----------------- //
  resetPassword(userId, phoneNo, email) {
    var data = {
      role: 'FLEET',
      clientId: userId,
      mobileNo: phoneNo,
      email: email
    }
    let paramData = JSON.stringify(data)
    console.log(paramData)
    this.router.navigate(['/reset-password'], { queryParams: { paramData: paramData } })
  }

}

