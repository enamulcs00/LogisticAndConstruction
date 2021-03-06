import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
 import { ngxCsv } from 'ngx-csv/ngx-csv';
 import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;

@Component({
  selector: 'app-list-of-company-booking',
  templateUrl: './list-of-company-booking.component.html',
  styleUrls: ['./list-of-company-booking.component.css']
})
export class ListOfCompanyBookingComponent implements OnInit {
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
  supplierArr: any=[];
  companyNameArr: any=[];
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'startdate': new FormControl('',),
      'enddate': new FormControl('',),
      'bookingId': new FormControl(''),
      'month': new FormControl(''),
      'supplier': new FormControl(''),
      'companyName': new FormControl(''),

    })
    
    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
     this.getQuoteList();
     this.getSupplierList()
     this.getCompanyNameList()
  }

  onFromChangeDate(){
    this.minToDate = this.fromDate;
  }
  onToChangeDate(){
    this.maxFromDate = this.toDate;
  }
//----------------------date validation ----------------------//
  dateValidation(){
    let date = new Date();
    let currentDay = date.getDate() >= 10 ? date.getDate(): '0'+ date.getDate();
    let currentMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1): '0'+date.getMonth();
    let currentYear = date.getFullYear();
    this.maxFromDate = currentYear + '-' + currentMonth + '-' + currentDay;
    this.maxToDate = currentYear + '-' + currentMonth + '-' + currentDay;

  }

  //-----------------------------list api integration --------------------------------//
  getQuoteList(){
    this.service.showSpinner()
    var url="account/admin/filter-client-request-details?page=" + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      }
      this.totalRecords = res.data.totalCount
      
    })
  }

  getCompanyNameList(){
    this.service.showSpinner()
    var url="account/admin/get-company-by-company-name"
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
         this.companyNameArr = res['data'];
      }   
    })
  }
  getSupplierList(){
    this.service.showSpinner()
    var url="account/get-supplier-name"
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.supplierArr = res['data'];
      }   
    })
  }

  // ------------------------pagination -------------------------//
 
  pagination(page) {
    this.currentPage = page;
    this.getQuoteList()  
  }
  //------------------------------filter by search api integration ---------------------------------//
  search() {
    let startdate = Date.parse(this.userForm.value.startdate)
    let enddate = Date.parse(this.userForm.value.enddate)
    var search = this.userForm.value.searchText;
    if( this.userForm.value.bookingId && this.userForm.value.startdate && this.userForm.controls.enddate.value && this.userForm.value.supplier && this.userForm.value.month && this.userForm.value.companyName){
      var url="account/admin/filter-client-request-details?fromDate="+startdate+'&toDate='+enddate+'&months='+this.userForm.value.month + '&supplierName='+ this.userForm.value.supplier + '&quotesId=' + this.userForm.value.bookingId
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage +'&companyName=' + this.userForm.value.companyName
    }
    else if(this.userForm.value.companyName){
      var url1="account/admin/filter-client-request-details?companyName="+this.userForm.value.companyName
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }
    else if(this.userForm.value.startdate && this.userForm.controls.enddate.value){
      var url2="account/admin/filter-client-request-details?fromDate="+startdate+'&toDate='+enddate
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }

    else if(this.userForm.value.bookingId){
      var url3="account/admin/filter-client-request-details?quotesId="+this.userForm.value.bookingId
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    else if(this.userForm.value.month){
      var url4="account/admin/filter-client-request-details?months="+this.userForm.value.month
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    else if(this.userForm.value.supplier){
      var url5="account/admin/filter-client-request-details?supplierName="+ this.userForm.value.supplier
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    this.service.get( url || url1 || url2 ||url3 || url4 || url5).subscribe((res: any) => {
      this.listing = res.data.list;
      console.log('kfg',this.listing);
      this.totalRecords = res.data.totalCount
    })
  }

  // ------------------------------reset filter------------------------------//
  resetForm(){
    this.userForm.reset()
    this.getQuoteList();    
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
        this.getQuoteList();
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
        this.getQuoteList()        
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
  userDetails(id,name){
    console.log(id,name)
    this.router.navigate(['/view-company-booking',id,name] )

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
  // ----------------------------------------export CSV
  ExportToCsv(){
    this.service.showSpinner()
    setTimeout( r => {
      this.service.hideSpinner()
    },3000)
    let listingArr=[]
    this.listing.forEach((element,ind )=> {
      let obj ={}
      obj ={
        "S no": ind + 1,
        "Quote Id": element.quotesId,
        "Supplier":  element.supplierName,
        "Material": element.material ,
        "Weight": element.weight ,
        "Delivery Date": element.deliveryDate ,
        "Location": element.location ,
        "Amount": element.bidAmount ,
        "PO Number": element.poNumber ,
        "Vehicle Number": element.truckNumber,
        
      }
      listingArr.push(obj)
    });
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Company Bookings Details CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
     const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(listingArr); 
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

  reset(){
    this.userForm.reset()
    this.getQuoteList();
  }

}

