import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {
  id:any;
  ViewSupplierForm: FormGroup
  listing: any = [];
  totalRecords: any
    constructor(private service:MainService,private activatedRoute:ActivatedRoute,private router:Router) {
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
        if (res['status'] == 200) {
          this.service.hideSpinner()
          this.listing = res.data;
          this.totalRecords = res.data.totalCount
          this.service.toasterInfo(res.message)
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
          this.service.hideSpinner()
          this.service.toasterErr(res.message)
        }
      },error=>{
        this.service.hideSpinner()
        this.service.toasterErr(error.message)
      }
      )
    }
    deleteSupplier(){
      let channel = `account/admin/delete-client-details?userIdToDeleteClient=${this.id}`
      this.service.showSpinner()
      this.service.get(channel).subscribe((res:any)=>{
          if(res.status == 200){
            this.service.hideSpinner()
            this.service.toasterSucc(res.message);
            this.router.navigate(['/list-of-supplier'])
          }
          else {
            this.service.hideSpinner()
            this.service.toasterErr(res.message)
            this.router.navigate(['/list-of-supplier'])
          }
      },err=>{
        this.service.hideSpinner()
        this.service.toasterErr(err.message)
        this.router.navigate(['/list-of-supplier'])
      }
      )
    }
}
