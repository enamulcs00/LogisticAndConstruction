import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-signup-data',
  templateUrl: './signup-data.component.html',
  styleUrls: ['./signup-data.component.css']
})
export class SignupDataComponent implements OnInit {
  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  userid: number;
  userStatus: any;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  pageSize: any = 10;
  action: any;
  userstatus: any;

  // pagination variable 
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  // search filter variable
  companyName: any = '';
  siteLocation: any = '';
  state: any = '';
  city: any = '';
  phoneNo: any = '';

  fleetOnwerCompanyNameArray: any = [];
  siteLocationArray: any = []
  stateArr: any = []
  selectedState: any;
  cityArr: any = []

  constructor(private router: Router, public service: MainService) {}

  ngOnInit() {
    this.getlist();
    this.getFleetOwnerlist() // list of fleet owner for search filter
    this.getStateList(); // list of state for search filter
  }

  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/filter-unverified-user?status=UNVERIFIED&page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)
      + (this.companyName ? ('&companyName=' + this.companyName) : '') + (this.siteLocation ? ('&siteLocation=' + this.siteLocation) : '')
      + (this.state ? ('&state=' + this.state) : '') + (this.city ? ('&city=' + this.city) : '') + (this.phoneNo ? ('&phoneNo=' + this.phoneNo) : '')}`
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
    if (this.companyName || this.siteLocation || this.state || this.city || this.phoneNo) {
      this.currentPage = 1;
      this.getlist()
    }
  }

  // ------------ reset -------------- //
  reset() {
    if (this.companyName || this.siteLocation || this.state || this.city || this.phoneNo) {
      this.companyName = ''
      this.siteLocation = ''
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
 
  // -------------- accept / reject company signup data ---------------- //
  reject(status, userId) {
    let url = `account/admin/action-on-signUpData?UserId=${userId}&userStatus=${status}`
    this.service.showSpinner()
    this.service.post(url, '').subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner()
      if (res.status == 200) {
        this.service.toasterSucc(res.message)
        this.getlist()
      } else {
        this.service.toasterErr(res.message)
      }
    })
  }

  accept(role, item) {
    console.log(role)
    console.log(item)
    let navigationExtras: NavigationExtras = { state: { paramData: item } };
    switch (role) {
      case 'COMPANY':
        this.router.navigate(['/add-company'], navigationExtras)
        break;
      case 'FLEET':
        this.router.navigate(['/add-fleet-owner'], navigationExtras)
        break;
      case 'SUPPLIER':
        this.router.navigate(['/add-supplier'], navigationExtras)
        break;
    }
  }
  // --------------- export to csv ------------------- //
  exportToCsv() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj = {
        "Company Name": element.companyName ? element.companyName : 'N/A',
        "User Type": element.role.role ? element.role.role : 'N/A',
        "Location": element.baseLocationAddress ? element.baseLocationAddress : 'N/A',
        "Mobile": element.phoneNo ? element.phoneNo : 'N/A',
        "E-Mail": element.email ? element.email : 'N/A',
        "City": element.city ? element.city : 'N/A',
        "State": element.state ? element.state : 'N/A',
        "Spl. Routes": element.routes ? element.routes : 'N/A',
        "Material Name": element.material ? element.material : 'N/A',
        "Pan no": element.panCardNo ? element.panCardNo : 'N/A',
        "Aadhaar No": element.aadharCardNo ? element.aadharCardNo : 'N/A',
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
      title: 'List Of Unverified Signup Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ["Company Name", "User Type", "Location", "Mobile", "E-Mail", "City", "State", "Spl. Routes", "Material Name", "Pan no", "Aadhaar No", "GSTIN", "Date Of Creation"]
    };
    new ngxCsv(dataArr, 'List-of-unverified-signup-data', options);
  }

}
