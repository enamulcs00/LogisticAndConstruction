import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
//import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;

@Component({
  selector: 'app-list-of-supplier-booking',
  templateUrl: './list-of-supplier-booking.component.html',
  styleUrls: ['./list-of-supplier-booking.component.css']
})
export class ListOfSupplierBookingComponent implements OnInit {

  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  //totalRecords: any
//  pageNumber:number=1

  userid: number;
  userStatus: any;
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  //pageSize: any=10;
  action: any;
  userstatus: any;
  companyName:any = '';
  firstName;any = '';
  months:any = ''
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', formdate: '' }
  minAge: Date;
  supplierNameArray:any = []

  monthsArray: any = [
    { id: '01', name: 'January' },
    { id: '02', name: 'February' },
    { id: '03', name: 'March' },
    { id: '04', name: 'April' },
    { id: '05', name: 'May' },
    { id: '06', name: 'June' },
    { id: '07', name: 'July' },
    { id: '08', name: 'August' },
    { id: '09', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ]
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {

     this.getlist();
     this.getSupplierList();
  }

  formdate() {
    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
  }
//----------------------date validation ----------------------//


  getSupplierList() {
    var url = 'account/admin/filter-fleet-request-details?months=00'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.supplierNameArray = res['data']['list'];
        console.log('Supp',this.supplierNameArray)
      }
    })
  }
  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/filter-fleet-request-details?&page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)
      + (this.companyName ? ('&companyName=' + this.companyName) : '') + (this.firstName ? ('&supplierName=' + this.firstName) : '')
      + (this.months ? ('&months=' + this.months) : ('&months=00'))
      + (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`
    this.service.get(url).subscribe((res: any) => {
      console.log('Get',res)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
        this.service.toasterSucc(res.message)
        this.totalItems = res.data.totalCount
      }
      else {
        this.service.toasterErr(res.message)
        this.listing = [];
        this.totalItems = 0
      }
    },err=>{
      this.service.toasterErr('Something went wrong')
    }
    )
  }
  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }
  search() {
    if (this.companyName || this.firstName || this.months || this.twoDate || this.fromDate) {
      this.currentPage = 1;
      this.getlist()
    }
  }
  reset() {
    if (this.companyName || this.firstName || this.months || this.twoDate || this.fromDate) {
      this.companyName = ''
      this.firstName = ''
      this.months = ''

      this.calender = { todate: '', formdate: '' }
      this.twoDate = ''
      this.fromDate = ''
      this.currentPage = 1
      setTimeout(() => {
        this.getlist()
      }, 200);
    }
  }

  //------------------------------filter by search api integration ---------------------------------//
  searchItem() {
    let startdate = Date.parse(this.userForm.value.startdate)
    let enddate = Date.parse(this.userForm.value.enddate)
    var search = this.userForm.value.searchText;
    if( this.userForm.value.searchText && this.userForm.value.startdate && this.userForm.controls.enddate.value){
      var url="account/admin/user-management/filter-user-details?fromDate="+startdate+'&toDate='+enddate+'&search='+search+'&page=0'
    }
    else if(this.userForm.value.startdate && this.userForm.controls.enddate.value){
      var url1="account/admin/user-management/filter-user-details?fromDate="+startdate+'&toDate='+enddate
    }

    else if(this.userForm.value.startdate && this.userForm.controls.enddate.value && this.userForm.value.searchText ){
      var url2="account/admin/user-management/filter-user-details?fromDate="+startdate+'&toDate='+enddate+'&search='+search

    }
    this.service.get( url || url1 || url2).subscribe((res: any) => {
      this.listing = res.data.list;
      console.log('kfg',this.listing);
      this.totalItems = res.data.totalCount
    })
  }

  // ------------------------------reset filter------------------------------//
  resetForm(){
    this.userForm.reset()
    this.getlist();
  }

  //========modal=======//
  delete(id: number) {
    this.userid = id;
    $('#deleteModal').modal('show')
  }
  //------------------------------delete api integration ----------------------------------//
  deleteUser() {
    var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userid) + '&ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location'));
    this.service.get(url).subscribe((res: any) => {
      this.deleted = res
      if (this.deleted.ststus = 200) {
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(this.deleted.message);
        this.getlist();
      }
     }, err => {
       this.service.hideSpinner();
        if (err['status'] == '401') {
            this.service.onLogout();
           this.service.toasterErr('Unauthorized Access');
         }
      else {
          this.service.toasterErr('Something Went Wrong');
        }
     })

  }

  //-------------------------block api integration------------------------//
  block(status , id){
     this.userid=id
       this.userstatus=status
    $('#block').modal('show')
  }
   blockUser(){
     this.service.showSpinner();
    var url = 'account/admin/user-management/user-status?ipAddress='+(localStorage.getItem('ipAddress'))+'&location='+(localStorage.getItem('location'))+ '&userIdForStatusUpdate='+(this.userid) + '&userStatus=' + (this.action);
       this.service.post(url,'').subscribe((res:any)=>{
        if(res.status == 200){
        this.service.hideSpinner()
           if (this.action == 'BLOCK') {
          $('#block').modal('hide');
          this.service.toasterSucc('User Blocked Successfully');
        }
        else {
          $('#active').modal('hide');
          this.service.toasterSucc('User Activated Successfully');
        }
        this.getlist()
          }
     }, err => {
         this.service.hideSpinner();
        if (err['status'] == '401') {
            this.service.onLogout();
           this.service.toasterErr('Unauthorized Access');
         }
      else {
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
  userDetails(id,email){
    this.router.navigate(['/user-details',id,email] )

  }

  walletdetail(id) {
    this.router.navigate(['walletdetails/' + id])
  }

//--------------------------------pageSize ---------------------------------//
  // showList(val) {
  //   this.pageSize = val
  //   this.resetForm()
  // }


  //----------------------------------export User---------------------------------//
  exportAsXLSX() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj ={}
      obj={
        "S no": ind + 1,
        "User ID": element.userId ? element.userId : '',
        "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Phone": element.phoneNo ? element.phoneNo : 'N/A',
        "Status": element.userStatus == 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
        "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      }
      dataArr.push(obj)
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User List');
  }
  ExportToCsv() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj = {
        "BookingId":element.bookingId ? element.bookingId : 'N/A',
        "Company":element.companyName?element.companyName:'N/A',
        "Supplier": element.supplierName ? element.supplierName  : 'N/A',
        "Material": element.material ? element.material  : 'N/A',
        "Weight": element.weight ? element.weight  : 'N/A',
        "Delivery date":  String(element.deliveryDate) ? String(element.deliveryDate).slice(0, 10) : 'N/A',
        "Location": element.baseLocationAddress ? element.baseLocationAddress : 'N/A',
        "Amount": element.bidAmount ? element.bidAmount  : 'N/A',
        "PO Number": element.poNumber ? element.poNumber  : 'N/A',
        "Vehicle No":element.truckNumber?element.truckNumber: 'N/A',
        "Vehicle Type": element.truckType ? element.truckType : 'N/A',
        "Driver Name": element.driverName ? element.driverName : 'N/A',
        "Driver Mobile No": element.driverMobileNo ? element.driverMobileNo : 'N/A',
        "Route Id": element.routeId ? element.routeId : 'N/A',

      }
      dataArr.push(obj)
    })
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Client Booking List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ["Client Booking", "BookingId", "Company", "Supplier", "Material", "Weight","Location", "Amount", "Delevery Date","Driver Name", "Driver Mobile","Vehicle Number","Vehicle Type","Route Id" ]
    };
    new ngxCsv(dataArr, 'Client-Booking', options);
  }
  //--------------------------------export pdf ----------------------------------------

  exportPDF(){
    this.service.showSpinner();
    setTimeout( r => {
      this.service.hideSpinner()
    },3000);
    kendo.drawing
      .drawDOM("#pdfcontent",
        {
          paperSize: "A2",
          margin: { top: "0.8cm", bottom: "1cm" },
          scale: 0.8,
          height: 400,
        })
      .then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Exported.pdf")
      });

  }


}
