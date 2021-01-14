import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-bid-by-fleet-owner-supplier',
  templateUrl: './view-bid-by-fleet-owner-supplier.component.html',
  styleUrls: ['./view-bid-by-fleet-owner-supplier.component.css']
})
export class ViewBidByFleetOwnerSupplierComponent implements OnInit {
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
    this.router.navigate(['/list-of-bid-by-fleet-owner-supplier'])
  }
}
