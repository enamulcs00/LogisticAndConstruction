import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-company-quote',
  templateUrl: './view-company-quote.component.html',
  styleUrls: ['./view-company-quote.component.css']
})
export class ViewCompanyQuoteComponent implements OnInit {

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }
  close(){
    this.router.navigate(['/list-of-company-quote'])
  }
}
