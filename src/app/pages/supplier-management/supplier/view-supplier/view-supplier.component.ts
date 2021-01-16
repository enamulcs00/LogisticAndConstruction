import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent implements OnInit {
id:any;
ViewSupplierForm: FormGroup
listing: any = [];
totalRecords: any
aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;
  constructor(private service:MainService,private activatedRoute:ActivatedRoute, private route:Router ) {
    this.ViewSupplierForm = new FormGroup({
firstName: new FormControl(''),
lastName: new FormControl(''),
phoneNo: new FormControl(''),
email: new FormControl(''),
companyName: new FormControl(''),
companyAddress: new FormControl(''),
cityName: new FormControl(''),
stateName: new FormControl(''),
AadharNo: new FormControl(''),
PanNumber: new FormControl(''),
gstNumber: new FormControl('')
    })

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((res:any)=>{
    this.id = res.id;
    })
    this.getlist()
  }
  getlist(){
    let channel = `account/admin/get-client-details?userIdToGetDetails=${this.id}`
    this.service.showSpinner()

    this.service.get(channel).subscribe((res:any)=>{
console.log('View Response',res.data)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res.message)
        this.listing = res.data;
        this.aadharCardUrl = res.data.userDetail.aadharCardUrl ? res.data.userDetail.aadharCardUrl : 'https://images.app.goo.gl/8DASmk93XpRTLdsG9';
        this.panCardUrl = res.data.userDetail.panCardUrl ? res.data.userDetail.panCardUrl : 'https://images.app.goo.gl/aDwPDsFSsVwxKQiq5'
        this.gstinUrl = res.data.userDetail.gstinUrl ? res.data.userDetail.gstinUrl : 'https://images.app.goo.gl/sCaxYXNT8VM47Ahq6'
        console.log('This is image pack',this.listing.userDetail)
        this.totalRecords = res.data.totalCount
        this.ViewSupplierForm.patchValue({
          firstName: this.listing?.userDetail?.firstName,
          lastName: this.listing?.userDetail?.lastName,
          phoneNo: this.listing?.userDetail?.phoneNo,
          email: this.listing?.email,
          companyAddress: this.listing?.userDetail?.baseLocationAddress,
          cityName: this.listing?.userDetail?.city,
          stateName: this.listing?.userDetail?.state,
          AadharNo: this.listing?.userDetail?.aadharCardNo,
          PanNumber: this.listing?.userDetail?.panCardNo,
          gstNumber: this.listing?.userDetail?.gstinNo,
          companyName: this.listing?.userDetail?.companyName
        })
      }
      else {

        this.service.toasterErr(res.message)
      }
    },(error:any)=>{
console.log('Error',error)
      this.service.toasterErr('Something went wrong')
    }
    )
  }
  editSupplier(){
    this.route.navigate(['edit-supplier', this.id])
  }
}
