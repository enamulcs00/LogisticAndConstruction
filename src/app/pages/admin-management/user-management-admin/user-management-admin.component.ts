import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-user-management-admin',
  templateUrl: './user-management-admin.component.html',
  styleUrls: ['./user-management-admin.component.css']
})
export class UserManagementAdminComponent implements OnInit {
  adminForm: FormGroup;
  userAdminData: any=[];
  totalRecords: any
  pageNumber:number=0
  itemsPerPage:number=20
  userStatus: any;
  current:any;
  userid: any;
  pageSize: number=10;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  ipAddress: any;
  location: any;
  
  constructor(public service:MainService, public route:Router)
   {this.current=new Date()
    console.log('f', this.current);
    
  }

  ngOnInit(): void {
    this.useradmin()
    this.adminForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'searchText' : new FormControl('')
    });
    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation();
    //this.getlist();
    // this.search()
  }


  dateValidation(){
    let date = new Date();
    let currentDay = date.getDate() >= 10 ? date.getDate(): '0'+ date.getDate();
    let currentMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1): '0'+date.getMonth();
    let currentYear = date.getFullYear();
    this.maxFromDate = currentYear + '-' + currentMonth + '-' + currentDay;
    this.maxToDate = currentYear + '-' + currentMonth + '-' + currentDay;
  }
  onFromChangeDate(){
    this.minToDate = this.fromDate;
  }
  onToChangeDate(){
    this.maxFromDate = this.toDate;
  }
// api of listing of user admin
  useradmin(){
    this.service.showSpinner();
    let searchAndFilterDto ={
 // "fromDate": "",
  "page": this.pageNumber,
  "pageSize": this.itemsPerPage,
  // "role": " ",
  // "search": "",
  // "status": "",
  // "toDate": "",
  // "userType": ""
 
    }
    var url="account/admin/user-management/search-and-filter-staff";
    this.service.post(url,searchAndFilterDto).subscribe((res:any)=>{
      console.log('fd', res);
      // if(res.status==200){
        this.service.hideSpinner()
       this.userAdminData=res.data.list;
      // }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.hideSpinner();
        this.service.toasterErr('Something Went Wrong');
      }
    })

  }

 // routing for view user admin
 viewAdmin(id){
   this.route.navigate(['/admin-detail'],{queryParams:{id:id}})

  }
  showList(val) {
    this.itemsPerPage = val
    this.resetForm()
  }

  search(){
    this.service.showSpinner();
    let searchAndFilterDto={
   "fromDate" : Date.parse(this.adminForm.value.startdate),
    "toDate" : Date.parse(this.adminForm.value.enddate),
    "search" :this.adminForm.value.searchText,
    "page": this.pageNumber,
    "pageSize": this.itemsPerPage
 }
     var url="account/admin/user-management/search-and-filter-staff"
      this.service.post(url,searchAndFilterDto).subscribe((res:any)=>{
        console.log('fd', res);
        if(res.status==200 || res.status==569){
          this.service.hideSpinner()
          this.userAdminData=res.data.list;
          this.totalRecords = res.data.totalCount
        }
      }, err => {
        this.service.hideSpinner();
        if (err['status'] == '401') {
         // this.service.onLogout();
          this.service.toasterErr('Unauthorized Access');
        } else {
          this.service.toasterErr('Something Went Wrong');
        }
      })
     }

     pagination(page){
      this.totalRecords=[]
      this.pageNumber=page;
      this.useradmin()
    }
  resetForm(){
    if((this.adminForm.value.startdate && this.adminForm.value.enddate) || this.adminForm.value.searchText){
      this.adminForm.reset()
     this.useradmin();
   
    }
  
  
}
changePage(page) {
  this.useradmin()
}

 //========modal=======//
 delete(id){
  this.userid=id
  $('#deleteModal').modal('show')
}
//api of delete
deleteUser(){
  this.service.showSpinner();
  this.ipAddress=localStorage.getItem('ipAddress'),
 this.location=localStorage.getItem('location')
 var url="account/admin/user-management/delete-user-detail?ipAddress="+this.ipAddress+"&location="+this.location+"&userIdToDelete="+this.userid;
  this.service.get(url).subscribe((res:any)=>{
    if(res.status==200){
      this.service.toasterSucc(res.message);
      this.service.hideSpinner();
      this.useradmin()
      $('#deleteModal').modal('hide')
    }
  }, err => {
    this.service.hideSpinner();
    if (err['status'] == '401') {
     // this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    } else {
      this.service.toasterErr('Something Went Wrong');
    }
  })
  
}
block(status , id){
  this.userid=id
  this.userStatus=status
  $('#block').modal('show')
}
blockUser(){
  this.service.showSpinner();
  //let data={}
//  this.ipAddress=localStorage.getItem('ipAddress'),
//  this.location=localStorage.getItem('location')
  var url='account/admin/user-management/user-status?ipAddress='+(localStorage.getItem('ipAddress'))+'&location='+(localStorage.getItem('location'))+'&userIdForStatusUpdate='+(this.userid)+'&userStatus='+(this.userStatus);
  this.service.post(url,'').subscribe((res:any)=>{
    if(res.status==200){
      this.service.toasterSucc(res.message);
      this.service.hideSpinner();
     // this.useradmin()
      $('#block').modal('hide')
      this.useradmin()
    }
}, err => {
  this.service.hideSpinner();
  if (err['status'] == '401') {
   // this.service.onLogout();
    this.service.toasterErr('Unauthorized Access');
  } else {
    this.service.toasterErr('Something Went Wrong');
  }
})
}

//export User
// exportAsXLSX() {
//   let dataArr = [];
//   this.userAdminData.forEach((element, ind) => {

//     dataArr.push({
//       "S no": ind + 1,
//       "Role": element.roleStatus ? element.roleStatus : '',
//       " Name": element.firstName + '' + element.lastName ? element.lastName : '',
//       "Email": element.email ? element.email : 'N/A',
//       "Phone": element.phoneNo ? element.phoneNo : 'N/A',
//       "Status": element.userStatus == true ? 'Active' : 'Inactive',
//       "Last Logged In": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
//     })
//   })

//   this.service.exportAsExcelFile(dataArr, 'USER MANAGEMENT ADMIN');
// }

}
