import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fleet-owner-booking',
  templateUrl: './view-fleet-owner-booking.component.html',
  styleUrls: ['./view-fleet-owner-booking.component.css']
})
export class ViewFleetOwnerBookingComponent implements OnInit {
  id: any;
  bookingData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params)
      this.id = params.id
    })
    this.getBid();
  }

  //-----------------------------list api integration --------------------------------//
  getBid() {
    this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = `account/admin/filter-fleet-request-details?&months=00${this.id}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      console.log('kfg', res);
      if (res['status'] == 200) {
        this.bookingData = res['data']['list'][0];
      }
    })
  }

  close() {
    this.router.navigate(['/list-of-fleet-owner-booking'])
  }
}
