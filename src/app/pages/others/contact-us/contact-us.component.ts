import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
// import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { ExportToCsv } from 'export-to-csv';
declare var $: any
declare var kendo: any;


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  IsUpdate: boolean = false;
  IsSave: boolean = false
  IsEdit:boolean = true
  userForm: FormGroup;
  contactUsForm: FormGroup;
  listing: any = [];
  ContactDetails;any = [];
  id: number;
  deleted: any;
  totalRecords: any
  pageNumber:number=1
  itemsPerPage:number=10
  userid: number;
  userStatus: any;
  fromDate: any;
  date = new Date()
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  pageSize: any=10;
  action: any;
  userstatus: any;
  constructor(
    private router: Router, public service: MainService, private fb:FormBuilder
  ) {

  }

  ngOnInit() {
    this.getContactDetails()
    this.contactUsForm = this.fb.group({
      'contactNo': ["",Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(15),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      'emailId': ["", Validators.compose([Validators.required, Validators.maxLength(60), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
    })

    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
    // this.getlist();
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

setEditContactDetails(){

  let url = `account/admin/set-edit-contact-Details`
  let obj =
  {

    "contactNo": this.contactUsForm.value.contactNo,

    "email": this.contactUsForm.value.emailId,

  }
  this.service.showSpinner()
  this.service.post(url,obj).subscribe((res:any)=>{
    console.log('This is contact Us',res)
this,this.service.hideSpinner()
this.contactUsForm.reset()
if(res.status == 200){
  this.service.toasterSucc(res.message)
  this.getContactDetails()
}
else{
  this.service.toasterErr(res.message)
  this.getContactDetails()
}
  },err=>{
    this.service.toasterErr('Something went wrong')
    this.getContactDetails()
  }
  )
}
EditContactUsDetails(){
  this.IsUpdate = true;
  this.IsSave = false
  this.IsEdit = false
this.contactUsForm.patchValue({
  emailId:this.listing.email,
  contactNo: this.listing.contactNo
})
}
getContactDetails(){
  let url = `account/admin/get-contact-Details`
  this.service.showSpinner()
  this.service.get(url).subscribe((res:any)=>{
    console.log('Conatc Get',res.data);

this,this.service.hideSpinner()
if(res.status == 200){
  this.listing = res.data[0];
  console.log('contact-ID',this.listing.contactDetailId)
  this.service.toasterSucc(res.message)
}
else{
  this.service.toasterErr(res.message)
}
  },err=>{
    this.service.toasterErr('Something went wrong')
  })
}

UpdateContact(){
  let url = `account/admin/set-edit-contact-Details`
  let obj =
  {
    "contactDetailId": this.listing.contactDetailId,
    "contactNo": this.contactUsForm.value.contactNo,
    "email": this.contactUsForm.value.emailId,



  }
  this.service.showSpinner()
  this.service.post(url,obj).subscribe((res:any)=>{
    console.log('This is contact Us',res)
this,this.service.hideSpinner()
this.contactUsForm.reset()
if(res.status == 200){
  this.IsUpdate = false
  this.IsEdit = true
  this.service.toasterSucc(res.message)
  this.getContactDetails()
}
else{
  this.service.toasterErr(res.message)
  this.getContactDetails()
}
  },err=>{
    this.service.toasterErr('Something went wrong')
    this.getContactDetails()
  }
  )
}

  //-----------------------------list api integration --------------------------------//
  // getlist(){
  //   this.service.showSpinner()
  //   var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
  //   this.service.get(url).subscribe((res:any)=>{
  //     this.service.hideSpinner()
  //     if (res['status'] == 200) {
  //       this.listing = res['data']['list'];
  //     }
  //     console.log('kfg',this.listing);
  //     this.totalRecords = res.data.totalCount
  //     console.log('kn', this.totalRecords);

  //   })
  // }
  // ------------------------pagination -------------------------//
  pagination(page){
    this.totalRecords=[]
    console.log('jh', page);
    this.pageNumber=page;
    console.log('jh', this.pageNumber);

    this.getContactDetails()
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
      this.totalRecords = res.data.totalCount
    })
  }

  // ------------------------------reset filter------------------------------//
  resetForm(){
    this.userForm.reset()
  //  this.getlist();
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
    //    this.getlist();
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
      //  this.getlist()
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
}
