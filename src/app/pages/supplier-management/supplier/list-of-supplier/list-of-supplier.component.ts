import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;
@Component({
  selector: 'app-list-of-supplier',
  templateUrl: './list-of-supplier.component.html',
  styleUrls: ['./list-of-supplier.component.css']
})
export class ListOfSupplierComponent implements OnInit {

  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  totalItems: any
  //pageNumber:number=1
  itemsPerPage:number=10
  currentPage: number = 1
  userid: number;
  userStatus: any;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  pageSize: any=10;
  action: any;
  userstatus: any;
  supplierNameArray:any = []

  location:any = '';
  firstName: any = '';
  state: any = '';
  city: any = '';
  phoneNo: any = '';
  stateArr: any = []
  selectedState: any;
  cityArr: any = []
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {

    this.FilterSupplierName()

    this.userForm = new FormGroup({
      'startdate': new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
      'searchText': new FormControl(''),
    })

    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
    this.getlist();
    this.getStateList();
  }

  addSupplier(){
    this.router.navigate(['/add-supplier'])
  }
  EditSupplier(){
    this.router.navigate(['/edit-supplier'])
  }
  viewSupplier(){}
  deleteSupplier(){}

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

  getlist(){

let url = `account/admin/filter-user-details?roleStatus=SUPPLIER&page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)
+ (this.location ? ('&siteLocation=' + this.location) : '') + (this.firstName ? ('&firstName=' + this.firstName) : '')
+ (this.state ? ('&state=' + this.state) : '') + (this.city ? ('&city=' + this.city) : '') + (this.phoneNo ? ('&phoneNo=' + this.phoneNo) : '')}`
    this.service.showSpinner()

    this.service.get(url).subscribe((res:any)=>{

      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
       // this.supplierNameArray = res['data']['list'];
        this.totalItems = res.data.totalCount
        this.service.toasterSucc(res.message)
      }
      else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    },(error:any)=>{
      if(error.status==401){
        this.service.toasterErr("UnAuthorized Access Denied")
      }
      else{

        this.service.toasterErr('something went wrong')
      }
    }
    )
  }
  FilterSupplierName(){
    let url = `account/admin/filter-user-details?roleStatus=SUPPLIER`
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.supplierNameArray = res['data']['list'];
        console.log('SuppListName',this.supplierNameArray)
      }
    })
  }
//SEARCH ITEMS
searchItem(){
  if (this.firstName || this.state || this.city || this.phoneNo || this.location) {
    this.currentPage = 1;
    this.getlist()
  }
}

reset() {
  if (this.location || this.firstName || this.state || this.city || this.phoneNo) {
    this.location = ''
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

  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }
  //------------------------------filter by search api integration ---------------------------------//
  search() {
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
  openblockModal(status , id){
     this.userid=id
       this.userstatus=status
    if(status == 'BLOCK'){
      $('#block').modal('show')
    }
    else{
      $('#active').modal('show')
    }

  }
   blockUser(){
     this.service.showSpinner();
    let url = `account/admin/enable-desable-status-by-admin?userId=${this.userid}&userStatus=${this.userstatus}`;
       this.service.get(url).subscribe((res:any)=>{

        if(res.status == 200){
        this.service.hideSpinner()
           if (this.userstatus == 'BLOCK') {
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
  userDetails(id){
    //this.router.navigate(['/view-supplier'])
    this.router.navigate(['/view-supplier'])
    // this.router.navigate(['/edit-supplier'])
    // this.router.navigate(['/delete-supplier'])

  }

  walletdetail(id) {
    this.router.navigate(['walletdetails/' + id])
  }

//--------------------------------pageSize ---------------------------------//
  showList(val) {
    this.pageSize = val
    this.resetForm()
  }

 // --------------- export to csv ------------------- //
 exportToCsv() {
  let dataArr = [];
  this.listing.forEach((element, ind) => {
    let obj = {
      "Supplier Name": element.firstName + element.lastName ? element.firstName + element.lastName  : 'N/A',
      "Location": element.baseLocationAddress ? element.baseLocationAddress : 'N/A',

      "Mobile": element.phoneNo ? element.phoneNo : 'N/A',
      "E-Mail": element.email ? element.email : 'N/A',
      "State": element.state ? element.state : 'N/A',
      "City": element.city ? element.city : 'N/A',
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
    title: 'List Of Supplier',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    headers: ["Supplier List", "Supplier Name", "Location", "Mobile", "E-Mail", "State","City", "GSTIN", "Date Of Creation"]
  };
  new ngxCsv(dataArr, 'List-of-Supplier', options);
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
  resetPassword(userId, phoneNo, email) {
    var data = {
      role: 'SUPPLIER',
      clientId: userId,
      mobileNo: phoneNo,
      email: email
    }
    let paramData = JSON.stringify(data)
    console.log(paramData)
    this.router.navigate(['/reset-password'], { queryParams: { paramData: paramData } })
  }

}

