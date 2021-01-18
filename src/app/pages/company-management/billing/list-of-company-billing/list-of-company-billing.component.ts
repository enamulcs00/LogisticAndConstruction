import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
 import { ngxCsv } from 'ngx-csv/ngx-csv';
 import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;

@Component({
  selector: 'app-list-of-company-billing',
  templateUrl: './list-of-company-billing.component.html',
  styleUrls: ['./list-of-company-billing.component.css']
})
export class ListOfCompanyBillingComponent implements OnInit {

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
      'invoiceNo':new FormControl('',),
      'startdate': new FormControl(''),
      'enddate': new FormControl('',),
      'month': new FormControl(''),
      'supplierName': new FormControl(''),
      'companyName': new FormControl(''),
    })
    
    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
    this.getSupplierList()
     this.getCompanyBillingList();
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
  getCompanyBillingList(){
    this.service.showSpinner()
    var url="account/admin/filter-fleet-request-details?months=00"  + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      }
      // console.log('kfg',this.listing);
       this.totalRecords = res.data.totalCount
      // console.log('kn', this.totalRecords);
      
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
    this.getCompanyBillingList()
  }
  //------------------------------filter by search api integration ---------------------------------//
  search() {
    let startdate = Date.parse(this.userForm.value.startdate)
    let enddate = Date.parse(this.userForm.value.enddate)
    var search = this.userForm.value.searchText;
    if( this.userForm.value.invoiceNo && this.userForm.value.startdate && this.userForm.controls.enddate.value && this.userForm.value.supplier && this.userForm.value.month && this.userForm.value.companyName){
      var url="account/admin/filter-fleet-request-details?fromDate="+startdate+'&toDate='+enddate+'&months='+this.userForm.value.month + '&supplierName='+ this.userForm.value.supplier + '&bookingId=' + this.userForm.value.invoiceNo+'&months='+ "00"
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage +'&companyName=' + this.userForm.value.companyName
    }
    else if(this.userForm.value.startdate && this.userForm.controls.enddate.value){
      var url1="account/admin/filter-fleet-request-details?fromDate="+startdate+'&toDate='+enddate +'&months='+ "00"
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage
    }

    else if(this.userForm.value.invoiceNo){
      var url2="account/admin/filter-fleet-request-details?bookingId="+this.userForm.value.invoiceNo+'&months='+ "00"
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    else if(this.userForm.value.month){
      var url3="account/admin/filter-fleet-request-details?months="+this.userForm.value.month
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    else if(this.userForm.value.supplier){
      var url4="account/admin/filter-fleet-request-details?supplierName="+ this.userForm.value.supplier+'&months='+ "00"
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    else if(this.userForm.value.companyName){
      var url5="account/admin/filter-fleet-request-details?companyName="+ this.userForm.value.companyName+'&months='+ "00"
      + '&page=' + (this.currentPage - 1) + '&pageSize=' + this.itemsPerPage

    }
    this.service.get( url || url1 || url2 ||url3 || url4 ||url5).subscribe((res: any) => {
      this.listing = res.data.list;
      console.log('kfg',this.listing);
      this.totalRecords = res.data.totalCount
    })
  }

  // ------------------------------reset filter------------------------------//
  resetForm(){
    this.userForm.reset()
    this.getCompanyBillingList();    
  }

  //========modal=======//
  delete(id: number) {
    this.userid = id;
    $('#deleteModal').modal('show')
  }
 

 
 
  
  //------------------- user details navigation------------------------------//
  billingDetails(id){
    this.router.navigate(['/view-company-billing',id] )

  }


//--------------------------------pageSize ---------------------------------//
  // showList(val) {
  //   this.pageSize = val
  //   this.resetForm()
  // }


 
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
        "Invoice No":  element.inVoiceNoForCompany,
        "Invoice Date": element.inVoiceDateForCompany ,
        "Booking Id": element.bookingId ,
        "Supplier": element.supplierName ,
        "Material": element.material ,
        "Weight": element.weight ,
        "Delivery Date ": element.deliveryDate ,
        "Location": element.location,
        "Amount": element.bidAmount,
        "PO Number": element.poNumber,
        "Vehicle Number": element.truckNumber,
        "Vehicle Type": element.truckType,
        "Driver Name": element.driverName,
        "Driver Mobile": element.driverMobileNo,
        "Route Id": element.routeId,
      }
      listingArr.push(obj)
    });
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Company Billing Details CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
     const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(listingArr); 
  }

  //--------------------------------export pdf ----------------------------------------
  
 
  viewBooking(){
    this.router.navigate(['/view-company-billing'])
  }

  reset(){
    this.userForm.reset()
    this.getCompanyBillingList()
  }
}