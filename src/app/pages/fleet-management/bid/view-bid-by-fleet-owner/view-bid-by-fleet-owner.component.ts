import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bid-by-fleet-owner',
  templateUrl: './view-bid-by-fleet-owner.component.html',
  styleUrls: ['./view-bid-by-fleet-owner.component.css']
})
export class ViewBidByFleetOwnerComponent implements OnInit {
  id: any;
  bidData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params)
      this.id = params.id
    })
    this.getBid();
  }

  //-----------------------------list api integration --------------------------------//
  getBid() {
    this.service.showSpinner()
    // var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`
    var url = `account/admin/filter-fleet-request-details?&months=00${this.id}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      console.log('kfg', res);
      if (res['status'] == 200) {
        this.bidData = res['data']['list'][0];
      }
    })
  }

  close() {
    this.router.navigate(['/list-of-bid-by-fleet-owner'])
  }
}
