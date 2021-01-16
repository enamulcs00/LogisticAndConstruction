import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;

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
  // totalRecords: any
  // pageNumber: number = 1
  // itemsPerPage: number = 20
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

  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    // this.userForm = new FormGroup({
    //   'startdate': new FormControl('', Validators.required),
    //   'enddate': new FormControl('', Validators.required),
    //   'searchText': new FormControl(''),
    // })

    // let date = new Date()
    // this.fromDate = (date.getDate() > 10 ? date.getDate() : '0' + date.getDate()) + '-' + (date.getMonth() > 10 ? date.getMonth() : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear()
    // this.toDate = (date.getDate() > 10 ? date.getDate() : '0' + date.getDate()) + '-' + (date.getMonth() > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear()
    // this.dateValidation()
    // this.getlist();
    this.getlist();
    this.getFleetOwnerlist() // list of fleet owner for search filter
    this.getStateList(); // list of state for search filter
  }

  // onFromChangeDate() {
  //   this.minToDate = this.fromDate;
  // }
  // onToChangeDate() {
  //   this.maxFromDate = this.toDate;
  // }
  // //----------------------date validation ----------------------//
  // dateValidation() {
  //   let date = new Date();
  //   let currentDay = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  //   let currentMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + date.getMonth();
  //   let currentYear = date.getFullYear();
  //   this.maxFromDate = currentYear + '-' + currentMonth + '-' + currentDay;
  //   this.maxToDate = currentYear + '-' + currentMonth + '-' + currentDay;

  // }

  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    // var url = "account/admin/filter-unverified-user?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}&status=UNVERIFIED`
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
      // console.log('kfg', this.listing);
      // console.log('kn', this.totalRecords);

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
  //------------------------------filter by search api integration ---------------------------------//
  // search() {
  //   let startdate = Date.parse(this.userForm.value.startdate)
  //   let enddate = Date.parse(this.userForm.value.enddate)
  //   var search = this.userForm.value.searchText;
  //   if (this.userForm.value.searchText && this.userForm.value.startdate && this.userForm.controls.enddate.value) {
  //     var url = "account/admin/user-management/filter-user-details?fromDate=" + startdate + '&toDate=' + enddate + '&search=' + search + '&page=0'
  //   }
  //   else if (this.userForm.value.startdate && this.userForm.controls.enddate.value) {
  //     var url1 = "account/admin/user-management/filter-user-details?fromDate=" + startdate + '&toDate=' + enddate
  //   }

  //   else if (this.userForm.value.startdate && this.userForm.controls.enddate.value && this.userForm.value.searchText) {
  //     var url2 = "account/admin/user-management/filter-user-details?fromDate=" + startdate + '&toDate=' + enddate + '&search=' + search

  //   }
  //   this.service.get(url || url1 || url2).subscribe((res: any) => {
  //     this.listing = res.data.list;
  //     console.log('kfg', this.listing);
  //     this.totalRecords = res.data.totalCount
  //   })
  // }

  // // ------------------------------reset filter------------------------------//
  // resetForm() {
  //   this.userForm.reset()
  //   this.getlist();
  // }

  // //========modal=======//
  // delete(id: number) {
  //   this.userid = id;
  //   $('#deleteModal').modal('show')
  // }
  // //------------------------------delete api integration ----------------------------------//
  // deleteUser() {
  //   var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userid) + '&ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location'));
  //   this.service.get(url).subscribe((res: any) => {
  //     this.deleted = res
  //     if (this.deleted.ststus = 200) {
  //       $('#deleteModal').modal('hide')
  //       this.service.toasterSucc(this.deleted.message);
  //       this.getlist();
  //     }
  //   }, err => {
  //     this.service.hideSpinner();
  //     if (err['status'] == '401') {
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }
  //     else {
  //       this.service.toasterErr('Something Went Wrong');
  //     }
  //   })

  // }

  // //-------------------------block api integration------------------------//
  // block(status, id) {
  //   this.userid = id
  //   this.userstatus = status
  //   $('#block').modal('show')
  // }
  // blockUser() {
  //   this.service.showSpinner();
  //   var url = 'account/admin/user-management/user-status?ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location')) + '&userIdForStatusUpdate=' + (this.userid) + '&userStatus=' + (this.action);
  //   this.service.post(url, '').subscribe((res: any) => {
  //     if (res.status == 200) {
  //       this.service.hideSpinner()
  //       if (this.action == 'BLOCK') {
  //         $('#block').modal('hide');
  //         this.service.toasterSucc('User Blocked Successfully');
  //       }
  //       else {
  //         $('#active').modal('hide');
  //         this.service.toasterSucc('User Activated Successfully');
  //       }
  //       this.getlist()
  //     }
  //   }, err => {
  //     this.service.hideSpinner();
  //     if (err['status'] == '401') {
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }
  //     else {
  //       this.service.toasterErr('Something Went Wrong');
  //     }
  //   })
  // }

  //---------------------------------- Delete / Block Function--------------//
  // openModal(action, userId) {
  //   this.userid = userId;
  //   this.action = action;
  //   if (action == 'DELETE') {
  //     $('#deleteModal').modal('show')

  //   } else if (action == 'BLOCK') {
  //     $('#block').modal('show')
  //   }
  //   else {
  //     $('#active').modal('show')
  //   }
  // }

  //------------------- user details navigation------------------------------//
  // userDetails(id, email) {
  //   this.router.navigate(['/user-details', id, email])

  // }

  // walletdetail(id) {
  //   this.router.navigate(['walletdetails/' + id])
  // }

  // //--------------------------------pageSize ---------------------------------//
  // showList(val) {
  //   this.pageSize = val
  //   this.resetForm()
  // }


  //----------------------------------export User---------------------------------//
  // exportAsXLSX() {
  //   let dataArr = [];
  //   this.listing.forEach((element, ind) => {
  //     let obj = {}
  //     obj = {
  //       "S no": ind + 1,
  //       "User ID": element.userId ? element.userId : '',
  //       "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
  //       "Email": element.email ? element.email : 'N/A',
  //       "Phone": element.phoneNo ? element.phoneNo : 'N/A',
  //       "Status": element.userStatus == 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
  //       "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
  //     }
  //     dataArr.push(obj)
  //   })

  //   this.service.exportAsExcelFile(dataArr, 'Admin User List');
  // }
  // // ----------------------------------------export CSV
  // ExportToCsv() {
  //   this.service.showSpinner()
  //   setTimeout(r => {
  //     this.service.hideSpinner()
  //   }, 3000)
  //   let listingArr = []
  //   this.listing.forEach((element, ind) => {
  //     let obj = {}
  //     obj = {
  //       "S no": ind + 1,
  //       "UserName": element.firstName + '' + element.lastName ? element.lastName : '',
  //       "EmailID": element.email ? element.email : 'N/A',
  //       "UserID": element.userId ? element.userId : 'N/A',
  //       "PhoneNumber": String(element.phoneNo) ? String(element.phoneNo) : 'N/A',
  //       "Status": element.userStatus == 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
  //       "Registration Date": String(element.createTime) ? String(element.createTime).slice(0, 10) : 'N/A',
  //     }
  //     listingArr.push(obj)
  //   });
  //   const options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: 'Candidate Details CSV',
  //     useTextFile: false,
  //     useBom: true,
  //     useKeysAsHeaders: true,
  //   };
  //   // const csvExporter = new ExportToCsv(options);
  //   //  csvExporter.generateCsv(listingArr); 
  // }

  // //--------------------------------export pdf ----------------------------------------

  // exportPDF() {
  //   this.service.showSpinner();
  //   setTimeout(r => {
  //     this.service.hideSpinner()
  //   }, 3000);
  //   kendo.drawing
  //     .drawDOM("#pdfcontent",
  //       {
  //         paperSize: "A2",
  //         margin: { top: "0.8cm", bottom: "1cm" },
  //         scale: 0.8,
  //         height: 400,
  //       })
  //     .then(function (group) {
  //       kendo.drawing.pdf.saveAs(group, "Exported.pdf")
  //     });

  // }

  // addCompany() {
  //   this.router.navigate(['/add-company'])
  // }
  // viewCompany() {
  //   this.router.navigate(['/view-company'])
  // }
  // deleteCompany() {
  //   this.router.navigate(['/delete-company'])
  // }
  // resetPassword() {
  //   console.log("reset password calickw")
  //   this.router.navigate(['/reset-password'])
  // }

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
        this.router.navigate(['/add-companies'], navigationExtras)
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
