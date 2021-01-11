import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-company-billing',
  templateUrl: './view-company-billing.component.html',
  styleUrls: ['./view-company-billing.component.css']
})
export class ViewCompanyBillingComponent implements OnInit {

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-company-billing'])
  }
}
