import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-bid-by-fleet-owner-supplier',
  templateUrl: './view-bid-by-fleet-owner-supplier.component.html',
  styleUrls: ['./view-bid-by-fleet-owner-supplier.component.css']
})
export class ViewBidByFleetOwnerSupplierComponent implements OnInit {
  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-bid-by-fleet-owner-supplier'])
  }
}
