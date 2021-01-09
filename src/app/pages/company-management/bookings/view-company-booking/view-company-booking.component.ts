import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-company-booking',
  templateUrl: './view-company-booking.component.html',
  styleUrls: ['./view-company-booking.component.css']
})
export class ViewCompanyBookingComponent implements OnInit {

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }

close(){
  this.router.navigate(['/list-of-company-booking'])
}
}
