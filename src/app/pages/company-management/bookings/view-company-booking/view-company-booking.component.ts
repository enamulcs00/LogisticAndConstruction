import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-company-booking',
  templateUrl: './view-company-booking.component.html',
  styleUrls: ['./view-company-booking.component.css']
})
export class ViewCompanyBookingComponent implements OnInit {
  userId: any;
  supplierName: any;
  listing: any=[];
  constructor(private router: Router, public service: MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']);
      this.supplierName= (params['name']);// (+) converts string 'id' to a number
      console.log(this.userId, this.supplierName)
       });
       this.getBookingDetails()
  }

  //Get particular company booking details
  getBookingDetails(){
    this.service.showSpinner()
    var url="account/admin/filter-client-request-details?quotesId=" +this.userId + '&supplierName=' +this.supplierName
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'][0];
      }    
    })
  }
 
close(){
  this.router.navigate(['/list-of-company-booking'])
}
}
