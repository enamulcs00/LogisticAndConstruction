import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm:FormGroup
  editImage: any;
  userDetail: any;
  date: Date;
  profile: any;
  userData: any;
  imageUrl: any;
  constructor(private router: Router,public service: MainService) { }

  ngOnInit() {
    this.date=new Date()
    console.log('hdhfd', this.date);
    
     this.myProfile()
    this.editForm = new FormGroup({
      'name': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'gender': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'DOB': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'phone': new FormControl('',[Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'address': new FormControl('', Validators.required)
    })
  }

  myProfile(){
    var url = 'account/my-account';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userDetail = res['data'];
        this.profile = this.userDetail.imageUrl;
        this.editForm.patchValue({
          'name': this.userDetail.firstName,
          'email': this.userDetail.email,
          'phone': this.userDetail.phoneNo,
          'address': this.userDetail.address,
          'gender': this.userDetail.gender,
          'DOB': this.userDetail.dob
         });
       
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  

  }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  // Api of update profile
  updateProfile() {
    var apiReq = {
      "address": this.editForm.value.address,
      "dob": this.editForm.value.DOB,
      "firstName": this.editForm.value.name,
      "phoneNo": this.editForm.value.phone,
      "gender": this.editForm.value.gender,
      "email": this.editForm.value.email,
      "imageUrl": this.profile,
    }
    this.service.showSpinner();
    this.service.post('account/profile-update', apiReq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.service.toasterSucc('Profile Updated Successfully');
       this.router.navigate(['my-profile'])
        
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }
 /** to call form data infoNotification */

 handleInputChange(event)
 {   
     
     var self = this;
     if (event.target.files && event.target.files[0]) {
       var type = event.target.files[0].type;
       if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
         let fileData = event.target.files[0];
        this.sendFormData1(fileData)
       var reader = new FileReader()
       } else {
         //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
       }
     }

 }
sendFormData1(fileData) {
  let formdata = new FormData()
formdata.append('file', fileData);
this.service.showSpinner();

// this.service.postApi('account/upload-file',formdata).subscribe(res => { 
  this.service.post('account/upload-file',formdata).subscribe((res:any)=>{
    
  if(res.status==200){
      this.service.hideSpinner()
      this.userData= res['data'];
      console.log('image', this.userData);
      this.profile = (this.userData) ? this.userData:this.profile;
      this.service.hideSpinner()
      this.service.toasterSucc(res['message'])
 }else{
    this.service.hideSpinner()
    this.service.toasterErr(res.message)
 }
}, error => {
  this.service.hideSpinner();
  // this.service.toasterErr(res.message)
});
 }
  
 getToday(): string {
  return new Date().toISOString().split('T')[0]
}
  

}
