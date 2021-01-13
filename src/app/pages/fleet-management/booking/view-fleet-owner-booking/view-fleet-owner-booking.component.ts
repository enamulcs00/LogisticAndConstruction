import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fleet-owner-booking',
  templateUrl: './view-fleet-owner-booking.component.html',
  styleUrls: ['./view-fleet-owner-booking.component.css']
})
export class ViewFleetOwnerBookingComponent implements OnInit {
  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }

close(){
  this.router.navigate(['/list-of-fleet-owner-booking'])
}
}
