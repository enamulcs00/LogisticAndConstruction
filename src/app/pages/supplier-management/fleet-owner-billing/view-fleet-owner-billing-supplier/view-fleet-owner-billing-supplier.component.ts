import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fleet-owner-billing-supplier',
  templateUrl: './view-fleet-owner-billing-supplier.component.html',
  styleUrls: ['./view-fleet-owner-billing-supplier.component.css']
})
export class ViewFleetOwnerBillingSupplierComponent implements OnInit {

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-fleet-owner-billing-supplier'])
  }
}