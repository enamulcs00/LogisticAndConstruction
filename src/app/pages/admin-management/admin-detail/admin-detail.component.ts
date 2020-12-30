import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  userId: any;
  Data: any;
  viewData: any;
  imageUrl: any;
  vewAdmin: FormGroup;

  constructor(private fb: FormBuilder, public route: Router, public service: MainService, public active: ActivatedRoute) {
    this.active.queryParams.subscribe((params) => {
      this.userId = params.id
      console.log('shiviuserid', this.userId)
    })
  }

  ngOnInit(): void {
    this.vewAdmin = this.fb.group({
      'checkArray': this.createLanguagesControl(),
    });
    this.viewAdmin();
  }

  createLanguagesControl() {
    const controls = this.checkboxesDataList.map(id => {
      return new FormControl(false);
    });
    return new FormArray(controls);
  }

  viewAdmin() {
    this.service.showSpinner();
    // var url="account/admin/user-management/user-details?userId="+this.userId;
    let commonDto = {
      "primaryIdCommonPerRequest": this.userId
    }
    this.service.post('account/admin/user-management/get-staff-user-profile', commonDto).subscribe((res: any) => {
      console.log("gf", res);
      if (res.status == 200 || res.status == 561) {
        this.service.hideSpinner();
        // this.viewData = res.data?.staffDetails
        // this.Data = res.data?.staffPrivileges;
        console.log('1234', this.Data)
        // this.vewAdmin.patchValue({
        //   'checkArray': this.Data
        // })
        //let controlArray = <FormArray>this.vewAdmin.controls["checkArray"];
        //let i = 0;
        for (var i=0; i< this.checkboxesDataList.length ; i++){
for (let data of this.Data){
  if (this.checkboxesDataList[i].id == data) {
    console.log('abc', data);
    //console.log('abc1', item.id);
    let controlArray = <FormArray>this.vewAdmin.controls["checkArray"];
    controlArray.controls[i].patchValue(true);
}
        }
        

          
        }

        // this.imageUrl=res.data.imageUrl
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
      label: 'Subadmin',
      isChecked: false
    }
  ]
  
}
