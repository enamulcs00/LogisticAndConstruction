import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-view-token',
  templateUrl: './view-token.component.html',
  styleUrls: ['./view-token.component.css']
})
export class ViewTokenComponent implements OnInit {

 
  coinShortName : any;
  coin: any;
  address: any;
  detail: any;
  
  constructor( private router: Router , public service:MainService,private active:ActivatedRoute) {
    this.active.queryParams.subscribe((params)=>{
      this.coin=params.id
      console.log('sudha1',this.coin)
    })
   }

  ngOnInit()  {
    // let obj = this.route.params.subscribe(params => {
    //   this.coin = (params.id); // (+) converts string 'id' to a number
     
    //    //localStorage.setItem('coin',this.coin)
    //    });
      
    this.viewaddress();
    this.viewdetail();
  }
viewaddress(){
  //var url= "wallet/coin/get-coin-details?coinName=XLM";
  //this.service.get(`wallet/coin/get-coin-details?coinName${=XLM`).subscribe((res:any)=>{
   // var url = "http://182.72.203.244:4042/wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+(this.coin)+"&storageType=HOT";

    this.service.get("wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+this.coin+"&storageType=HOT").subscribe((res:any)=>{
    if(res['status']==200){
      this.address=res.data
      
    }else if(res.status==205){
      this.service.toasterErr(res.message)
    }
  },
  err => {
    this.service.hideSpinner();
    if (err['status'] == '401') {
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    } else {
      this.service.toasterErr('Something Went Wrong');
    }
  }
  )


}
viewdetail(){
  //var url = "http://182.72.203.244:4042/wallet/coin/get-coin-details?coinName=XLM";
    this.service.get('wallet/coin/get-coin-details?coinName='+this.coin).subscribe((res:any)=>{
    if(res['status']==200){
      this.detail=res.data
      
    }else if(res.status==205){
      this.service.toasterErr(res.message)
    }
  },
  err => {
    this.service.hideSpinner();
    if (err['status'] == '401') {
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    } else {
      this.service.toasterErr('Something Went Wrong');
    }
  }
  )


}
}
