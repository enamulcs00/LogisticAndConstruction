import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ExportToCsv } from 'export-to-csv';
declare var $: any
declare var kendo: any;

@Component({
  selector: 'app-list-of-company-user',
  templateUrl: './list-of-company-user.component.html',
  styleUrls: ['./list-of-company-user.component.css']
})
export class ListOfCompanyUserComponent implements OnInit {
  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  totalRecords: any
  currentPage: number = 1
  itemsPerPage: number = 10
  userid: number;
  userStatus: any;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  action: any;
  userstatus: any;
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  companyNameArr: any = [];
  companyListing: any = [];
  selectedCompany: any;
  siteArr: any = [];
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    this.byDefaultCompanyUserList()
    this.userForm = new FormGroup({
      'companyName': new FormControl(''),
      'userType': new FormControl(''),
      'siteAddress': new FormControl(''),
      'firstName': new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': new FormControl('', [Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
    })

    let date = new Date()
    this.fromDate = (date.getDate() > 10 ? date.getDate() : '0' + date.getDate()) + '-' + (date.getMonth() > 10 ? date.getMonth() : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear()
    this.toDate = (date.getDate() > 10 ? date.getDate() : '0' + date.getDate()) + '-' + (date.getMonth() > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear()
    this.dateValidation()
    // this.getCompanyUserList();
    this.getStateList()
    this.getCompanyNameList()

  }

  onFromChangeDate() {
    this.minToDate = this.fromDate;
  }
  onToChangeDate() {
    this.maxFromDate = this.toDate;
  }
  //----------------------date validation ----------------------//
  dateValidation() {
    let date = new Date();
    let currentDay = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    let currentMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + date.getMonth();
    let currentYear = date.getFullYear();
    this.maxFromDate = currentYear + '-' + currentMonth + '-' + currentDay;
    this.maxToDate = currentYear + '-' + currentMonth + '-' + currentDay;

  }

  //-----------------------------list api integration --------------------------------//
  byDefaultCompanyUserList() {
    this.service.showSpinner()
    var url = "account/admin/filter-user-details?roleStatus=" + 'COMPANY_ADMIN' + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      }
      console.log('kfg', this.listing);
      this.totalRecords = res.data.totalCount
      console.log('kn', this.totalRecords);

    })
  }
  getCompanyUserList() {
    this.service.showSpinner()
    var url = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      }
      console.log('kfg', this.listing);
      this.totalRecords = res.data.totalCount
      console.log('kn', this.totalRecords);

    })
  }
  //get State list
  getStateList() {
    this.service.showSpinner()
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.stateArr = res['data'];
      }
    })
  }

  //get city list
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

  getCompanyNameList() {
    this.service.showSpinner()
    var url = "account/admin/get-company-by-company-name"
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.companyNameArr = res['data'];
      }
    })
  }

  searchLocation(event) {
    this.siteArr = []
    this.service.showSpinner()
    this.selectedCompany = event.target.value
    console.log("event", this.selectedCompany)
    var url = "account/admin/get-location?idOfCompany=" + this.selectedCompany
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.siteArr = res['data'];
      }
    })
  }

  // ------------------------pagination -------------------------//

  pagination(page) {
    this.currentPage = page;
    this.getCompanyUserList()
    this.byDefaultCompanyUserList()
  }

  //------------------------------filter by search api integration ---------------------------------//
  search() {

    if (this.userForm.value.companyName && this.userForm.value.siteAddress && this.userForm.value.firstName && this.userForm.value.lastName && this.userForm.value.mobileNo) {
      var url = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&companyName=' + this.userForm.value.companyName + '&baseLocationAddress=' + this.userForm.value.siteAddress
        + '&firstName=' + this.userForm.value.firstName + '&lastName=' + this.userForm.value.lastName + '&search=' + this.userForm.value.mobileNo
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.companyName) {
      var url1 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&companyName=' + this.userForm.value.companyName
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.siteAddress) {
      var url2 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType  + '&baseLocationAddress=' + this.userForm.value.siteAddress
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.companyName && this.userForm.value.siteAddress) {
      var url3 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&companyName=' + this.userForm.value.companyName + '&baseLocationAddress=' + this.userForm.value.siteAddress
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.firstName ) {
      var url4 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&firstName=' + this.userForm.value.firstName 
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.lastName) {
      var url5 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType  + '&lastName=' + this.userForm.value.lastName
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.firstName && this.userForm.value.lastName) {
      var url6 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&firstName=' + this.userForm.value.firstName + '&lastName=' + this.userForm.value.lastName
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if (this.userForm.value.phoneNo) {
      var url7 = "account/admin/filter-user-details?roleStatus=" + this.userForm.value.userType + '&search=' + this.userForm.value.phoneNo
        + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    this.service.get(url || url1 || url2 || url3 || url4|| url5|| url6|| url7).subscribe((res: any) => {
      this.listing = res.data.list;
      console.log('kfg', this.listing);
      this.totalRecords = res.data.totalCount
    })
  }

  // ------------------------------reset filter------------------------------//
  // resetForm(){
  //   this.userForm.reset()
  //   this.byDefaultCompanyUserList()
  //   this.getCompanyUserList();    
  // }

  //========modal=======//
  delete(id: number) {
    this.userid = id;
    $('#deleteModal').modal('show')
  }

  //-------------------------block api integration------------------------//
  block(status, id) {
    this.userid = id
    this.userstatus = status
    $('#block').modal('show')
  }
  blockUser() {
    this.service.showSpinner();
    var url = 'account/admin/enable-desable-status-by-admin?userStatus=' + this.action + '&userId=' + this.userid
    this.service.get(url).subscribe((res: any) => {
      if (res.status == 200) {
        this.service.hideSpinner()
        if (this.action == 'BLOCK') {
          $('#block').modal('hide');
          this.service.toasterSucc('Company User Blocked Successfully');
        }
        else {
          $('#active').modal('hide');
          this.service.toasterSucc('Company User Activated Successfully');
        }
       // this.getCompanyUserList()
       this.userForm.reset()
       this.byDefaultCompanyUserList()
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


  //---------------------------------- Delete / Block Function--------------//
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

  //------------------- user details navigation------------------------------//
  userDetails(id, email) {
    this.router.navigate(['/user-details', id, email])

  }



  //--------------------------------pageSize ---------------------------------//
  // showList(val) {
  //   this.pageSize = val
  //   this.resetForm()
  // }



  // ----------------------------------------export CSV
  ExportToCsv() {
    this.service.showSpinner()
    setTimeout(r => {
      this.service.hideSpinner()
    }, 3000)
    let listingArr = []
    this.listing.forEach((element, ind) => {
      let obj = {}
      obj = {
        "S no": ind + 1,
        "Company Name": element.companyName,
        "Mobile No": element.phoneNo,
        "First Name": element.firstName,
        "Last Name": element.lastName,
        "Email": element.email,
        "Site": element.baseLocationAddress,
        "Roll Type": element.role.role,
        "Status": element.userStatus,


      }
      listingArr.push(obj)
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Company User Details CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(listingArr);
  }



  addCompanyUser() {
    this.router.navigate(['/add-company-user'])
  }
  viewCompanyUser(id) {
    this.router.navigate(['/view-company-user', id])
  }
  deleteCompanyUser(id) {
    this.router.navigate(['/delete-company-user', id])
  }
  resetPassword() {
    console.log("reset password calickw")
    this.router.navigate(['/reset-password'])
  }
  reset() {
    this.userForm.reset()
    this.byDefaultCompanyUserList()
   
  }
}


