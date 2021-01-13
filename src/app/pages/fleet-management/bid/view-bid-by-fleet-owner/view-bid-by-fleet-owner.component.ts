import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bid-by-fleet-owner',
  templateUrl: './view-bid-by-fleet-owner.component.html',
  styleUrls: ['./view-bid-by-fleet-owner.component.css']
})
export class ViewBidByFleetOwnerComponent implements OnInit {

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-bid-by-fleet-owner'])
  }
}
