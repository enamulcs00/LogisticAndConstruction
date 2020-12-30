import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  txnid: any;
  detail: any;
  basicTradeHistoryId: any;
  obj: any;
  //id: any;
  

  constructor(public active: ActivatedRoute, private router: Router, public service: MainService) { 
    this.active.queryParams.subscribe((params)=>{
      console.log('hellohello')
      this.txnid=params.id
      console.log('seetta',this.txnid)
    })
    // this.obj=this.active.params.subscribe((params)=>{
    //   this.id=params.id1
    //   console.log('hellohello',params)
    // })
  }

  ngOnInit() {
    this.viewDetails();
  }

  
  viewDetails(){
    // console.log('jhjh', 'hhjh');
    
    // this.viewtransaction=false;
    // this.transaction=false;
     this.service.get('wallet/admin-basic-exchange/get-user-trading-history-detail?basicTradeHistoryId='+this.txnid).subscribe((res:any)=>{
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
