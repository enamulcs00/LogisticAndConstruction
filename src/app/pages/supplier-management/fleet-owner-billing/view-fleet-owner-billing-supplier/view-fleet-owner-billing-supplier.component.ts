import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-fleet-owner-billing-supplier',
  templateUrl: './view-fleet-owner-billing-supplier.component.html',
  styleUrls: ['./view-fleet-owner-billing-supplier.component.css']
})
export class ViewFleetOwnerBillingSupplierComponent implements OnInit {
  MapUrl = '';
  weightSlipUrl = '';
  selfiUrl = '';
  InvoiceUrl = '';
  id:any;
  bookingItems:any=[];
    constructor(private actroute:ActivatedRoute, private service:MainService,private router:Router) {
      this.actroute.params.subscribe((res:any)=>{
        this.id = res.id
      })
     }

    ngOnInit() {
      this.viewMyBookings()
    }
  viewMyBookings(){
    this.service.showSpinner()
    let url = `account/admin/filter-fleet-request-details?bookingId=${this.id}&months=00`;
    this.service.get(url).subscribe((res:any)=>{
  if(res.status == 200){
    this.bookingItems = res.data.list[0]
    console.log('Booking',this.bookingItems)
    this.service.hideSpinner()
    this.service.toasterSucc(res.message)
    this.weightSlipUrl = this.bookingItems?.uploadSlip;
    this.selfiUrl = this.bookingItems?.uploadSelfi
  }
  else {
    this.service.hideSpinner()
    this.service.toasterErr(res.message)
  }
    },err=>{
      this.service.hideSpinner()
      this.service.toasterErr('Something went wrong')
    }
    )
  }
  close(){
    this.router.navigate(['/list-of-fleet-owner-billing-supplier'])
  }
}
