import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-supplier-booking',
  templateUrl: './view-supplier-booking.component.html',
  styleUrls: ['./view-supplier-booking.component.css']
})
export class ViewSupplierBookingComponent implements OnInit {
id:any;
comment:any = ''
bookingItems:any=[];
  constructor(private actroute:ActivatedRoute, private service:MainService,private route:Router) {
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
this.comment = res.data.list[0].comments
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
}
