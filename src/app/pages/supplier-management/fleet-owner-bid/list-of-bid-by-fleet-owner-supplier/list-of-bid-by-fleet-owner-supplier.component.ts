import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
// import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { ExportToCsv } from 'export-to-csv';

declare var $: any
declare var kendo: any;

@Component({
  selector: 'app-list-of-bid-by-fleet-owner-supplier',
  templateUrl: './list-of-bid-by-fleet-owner-supplier.component.html',
  styleUrls: ['./list-of-bid-by-fleet-owner-supplier.component.css']
})
export class ListOfBidByFleetOwnerSupplierComponent implements OnInit {
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  totalRecords: any
  pageNumber:number=1

  userid: number;
  userStatus: any;

  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  pageSize: any=10;
  action: any;
  userstatus: any;
  BookingId:any = ''
  firstName:any=''
  companyName:any=''

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
    this.getSupplierList()
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
      + (this.BookingId ? ('&bookingId=' + this.BookingId) : '') + (this.firstName ? ('&supplierName=' + this.firstName) : '')
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
  pagination(page){
    this.totalRecords=[]
    console.log('jh', page);
    this.pageNumber=page;
    console.log('jh', this.pageNumber);

    this.getlist()
  }
  //------------------------------filter by search api integration ---------------------------------//


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
  showList(val) {
    this.pageSize = val
    this.resetForm()
  }


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
        "UserName": element.firstName + '' + element.lastName ? element.lastName : '',
        "EmailID":  element.email ? element.email : 'N/A',
        "UserID": element.userId ? element.userId : 'N/A',
        "PhoneNumber": String(element.phoneNo) ? String(element.phoneNo) : 'N/A',
        "Status": element.userStatus == 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
        "Registration Date": String(element.createTime) ? String(element.createTime).slice(0, 10) : 'N/A',
      }
      listingArr.push(obj)
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Candidate Details CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    // const csvExporter = new ExportToCsv(options);
    //  csvExporter.generateCsv(listingArr);
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

  viewBooking(){
    this.router.navigate(['/view-bid-by-fleet-owner-supplier'])
  }


}
