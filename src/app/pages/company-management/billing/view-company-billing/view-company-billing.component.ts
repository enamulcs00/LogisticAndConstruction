import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-view-company-billing',
  templateUrl: './view-company-billing.component.html',
  styleUrls: ['./view-company-billing.component.css']
})
export class ViewCompanyBillingComponent implements OnInit {
  billingId: any;
  listing: any;

  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.billingId = (params['id']);
       });
       this.getBillingDetails()
  }

  //Get particular billing details
  getBillingDetails(){
    this.service.showSpinner()
    var url="account/admin/filter-fleet-request-details?months=00" + '&bookingId=' +this.billingId
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'][0];
      }    
    })
  }

  close(){
    this.router.navigate(['/list-of-company-billing'])
  }
}
