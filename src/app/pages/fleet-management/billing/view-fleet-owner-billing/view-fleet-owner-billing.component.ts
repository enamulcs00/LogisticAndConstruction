import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fleet-owner-billing',
  templateUrl: './view-fleet-owner-billing.component.html',
  styleUrls: ['./view-fleet-owner-billing.component.css']
})
export class ViewFleetOwnerBillingComponent implements OnInit {

  id: any;
  billingData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params)
      this.id = params.id
    })
    this.getBilling();
  }

  //-----------------------------list api integration --------------------------------//
  getBilling() {
    this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = `account/admin/filter-fleet-request-details?&months=00${this.id}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      console.log('kfg', res);
      if (res['status'] == 200) {
        this.billingData = res['data']['list'][0];
      }
    })
  }
  
  close(){
    this.router.navigate(['/list-of-fleet-owner-billing'])
  }
}
