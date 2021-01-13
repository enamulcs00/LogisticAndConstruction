import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fleet-owner-billing',
  templateUrl: './view-fleet-owner-billing.component.html',
  styleUrls: ['./view-fleet-owner-billing.component.css']
})
export class ViewFleetOwnerBillingComponent implements OnInit {

 
  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-fleet-owner-billing'])
  }
}
