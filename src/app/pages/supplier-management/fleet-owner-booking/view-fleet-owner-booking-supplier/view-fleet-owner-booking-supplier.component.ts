import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fleet-owner-booking-supplier',
  templateUrl: './view-fleet-owner-booking-supplier.component.html',
  styleUrls: ['./view-fleet-owner-booking-supplier.component.css']
})
export class ViewFleetOwnerBookingSupplierComponent implements OnInit {
  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }

close(){
  this.router.navigate(['/list-of-fleet-owner-booking-supplier'])
}
}