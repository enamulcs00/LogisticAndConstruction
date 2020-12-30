import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-administer',
  templateUrl: './add-administer.component.html',
  styleUrls: ['./add-administer.component.css']
})
export class AddAdministerComponent implements OnInit {
  addAdmin: FormGroup;
  editImage: any;
  subAdminData: any;
  newArr: any=[];
  profile: any;
  userData: any;
  selectedItemsList: { id: string; label: string; isChecked: boolean; }[];

  constructor(private fb: FormBuilder,public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.addAdmin = this.fb.group({
      'name': this.fb.control('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'phoneNo': this.fb.control('',[Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)]),
      'email' :  this.fb.control('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'password' : this.fb.control('', Validators.compose([Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)])),
      'confirmPassword' : this.fb.control('', Validators.compose([Validators.required])),
      'lastname' : this.fb.control('',[Validators.required,  Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'status': this.fb.control('',Validators.required),
      'contact':this.fb.control('',[Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'checkArray': this.fb.array([], [Validators.required])
     // 'checkArray': new FormControl('',Validators.required)
    })
  }

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

  /** to call form data infoNotification */
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
  
  
  // api of add subadmin
  addSubAdmin(){
    this.service.showSpinner();
    let subAdminDto={
  "address": "string",
  "city": "string",
  "country": "string",
  "countryCode": "string",
  "dob": "string",
  "email": this.addAdmin.value.email,
  "firstName": this.addAdmin.value.name,
  "gender": "string",
  "imageUrl": this.userData,
  "ipAddress": "string",
  "lastName": this.addAdmin.value.lastname,
  "location": "string",
  "password": this.addAdmin.value.password,
  "phoneNo": this.addAdmin.value.phoneNo,
  "previlage": this.addAdmin.value.checkArray,
  "roleId": "string",
  "roleStatus": "SUBADMIN",
  "state": "string",
  "userIdToUpdate": 0,
  "userPermissions": [
    {
      "isDeleted": true,
      "masterPermissionList": {
        "isMenu": true,
        "masterPermissionListId": 0,
        "menuPermission": {
          "dataMenu": "string",
          "dataSubMenu": "string",
          "menuName": "string",
          "menuPermissionId": 0,
          "parentId": 0,
          "path": "string",
          "subMenuName": "string"
        },
        "parentId": 0
      },
      "userPermissionsId": 0
    }
  ],
  "webUrl":this.service.websiteURL+'reset-password'
     
    }
   // let userid ={ userId : localStorage.getItem('Auth')
 // }
    this.service.post('account/admin/user-management/create-sub-admin',subAdminDto).subscribe((res:any)=>{
      console.log('f', res);
      if(res.status==200 ){
        this.service.hideSpinner();
        this.subAdminData=res.data
        this.route.navigate(['/user-management-admin']);
        
      }
      else if(res.status==205){
        this.service.hideSpinner();
        this.service.toasterErr(res.message)
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
  onCheckboxChange(e) {
    
    const checkArray: FormArray = this.addAdmin.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('checkbox123',checkArray)
  }

  checkboxesDataList = [
    {
      id: 'DASHBOARD',
      label: 'Dashboard',
      isChecked: false
    },
    {
      id: 'USER_MANAGEMENT',
      label: 'User Management',
      isChecked: false
    },
    
    {
      id: 'WALLET_MANAGEMENT',
      label: 'Wallet Management',
      isChecked: false
    },
    {
      id: 'STATIC_CONTENT',
      label: 'Static Content',
      isChecked: false
    },
    {
      id: 'KYC_MANAGEMENT',
      label: 'KYC Management',
      isChecked: false
    },
    {
      id: 'TOKEN_MANAGEMENT',
      label: 'Token Management',
      isChecked: false
    },
    {
      id: 'TRANSCATION_MANAGEMENT',
      label: 'Transcation Management',
      isChecked: false
    },
    {
      id: 'SUBADMIN_MANAGEMENT',
      label: 'Subadmin Management',
      isChecked: false
    }
  ]
  

}
