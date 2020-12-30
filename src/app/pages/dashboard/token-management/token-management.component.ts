import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-token-management',
  templateUrl: './token-management.component.html',
  styleUrls: ['./token-management.component.css']
})
export class TokenManagementComponent implements OnInit {
  listing: any = [];
  currTab: any='Price';
  pageNumber: number=1;
  itemsPerPage:number=20;
  //list: any;
  viewTransaction : boolean=true;
  coinData: any=[];
  coinShortName: any;
  priceForm: FormGroup;
  priceData: any;
  coinName: any=[];
  coin: any=[];
  priceDataa: any;
  transactionData: any=[];
  transactionLength: any;
  transferForm: FormGroup;
  buyTransactionData: any=[];
  tab: any='Buy';
  withdrawTransactionData: any=[];
  transferData: any=[];
  totalRecords: any;
  pageSize: any=10;
  userId: any;
  txnData: any=[];
  user: boolean=true;
  transaction: boolean;
  price: boolean;
  detail: any;
  txnid: any;
  viewtx:boolean=true;
  temp: any;
  constructor(
    private router : Router, public service:MainService,private active:ActivatedRoute
  ) {
    // this.active.queryParams.subscribe((params)=>{
    //   this.coin=params.id
    //   console.log('sudha1',this.coin)
    // })
   }

  ngOnInit() {
    //this.forValidation();
    this.currTab == "price"
   this.coinList();
   //this.transactionList();
  }

  // form Validation
  forValidation(){
    this.priceForm= new FormGroup({
      'price': new FormControl('',[Validators.required, Validators.pattern('')])
    });
    this.transferForm= new FormGroup({
      'price': new FormControl('',[Validators.required, Validators.pattern('')]),
      'address': new FormControl('',[Validators.required, Validators.pattern('')]),
      'coin': new FormControl('',[Validators.required, Validators.pattern('')]),
      
    });
  }

 

  selectTab(tab ){
    this.currTab = tab;
    console.log('message12',this.currTab)
    if(this.currTab === 'Price'){
      this.coinList()
      this.viewTransaction=true;
      this.user=false;
      this.price=true;
    }
   else{
    // this.tab=='Buy';
    //this.buyGetTransaction();
    if(this.currTab === 'User'){
      this.viewTransaction=true;
    this.user=true;
    this.transactionList()
    }
 
    }
    //else if (this.currTab === 'Admin'){
      // this.loginSession()
     // this.select(tab)
   // }
    
  }

  // select(tab){
  //   this.tab=tab;
  //   if(this.tab==='Buy'){
  //     this.buyGetTransaction()
  //   }
  //   else if(this.tab==='Withdraw'){
  //     this.withdrawGetTransaction()
  //   }
  //   else if(this.tab==='Transfer'){
      
  //   }
  //   else if(this.tab==='History'){
  //    // this.adminTransfer()
  //   }
  // }

  
  // coin list api
  coinList(){
    var url = "wallet/coin/get-coin-list";
    this.service.get(url).subscribe((res:any)=>{
      //console.log('df', res);
      if(res['status']==200){
        this.coinData=res.data;
        // this.coinData.forEach(element => {
        //   this.coinName=element.coinShortName;
        //  // this.coinArr = localStorage.getItem('coinname') ? JSON.parse(localStorage.getItem('coinname')) ;
        //  localStorage.setItem('coinArr',JSON.stringify(this.coinName))
        //   console.log('h',this.coinName);
        //   this.coin.push(this.coinName)
        // });
        console.log('coinlist',this.coinData);
        
        
        this.coinShortName=res.data[0].coinType;
        console.log('fg',this.coinShortName);
        //this.getPrice();
        //this.getAvtPrice();
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    });
    

  }


  transactionList(){
    //var url = "wallet/admin-basic-exchange/get-all-users-trading-history?page=1&pageSize=10&userId=123";
    var url="wallet/admin-basic-exchange/get-all-users-trading-history?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`+'&userId=123'
    this.service.get(url).subscribe((res:any)=>{
      //console.log('df', res);
      if(res['status']==200){
        this.txnData=res['data']['list'];
        console.log('sudha',this.txnData);
        this.txnData.forEach(element => {
         // this.transaction=element.userId;
         // this.txnArr = localStorage.getItem('transaction') ? JSON.parse(localStorage.getItem('transaction')) ;
         //localStorage.setItem('txnArr',JSON.stringify(this.transaction))
         // console.log('h',this.userId);
         // this.coin.push(this.userId)
        });
        //console.log('h',this.coin);
        
        
        //this.coinShortName=res.data[0].coinType;
       // console.log('fg',this.coinShortName);
       // this.getPrice();
        //this.getAvtPrice();
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    });
    

  }

  getlist(){
    var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +"&pageSize=20"
    this.service.get(url).subscribe((res:any)=>{
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
      }
      console.log('kfg',this.listing);
      this.totalRecords = res.data.totalCount
      console.log('kn', this.totalRecords);
      
    })
  }
  pagination(page){
    this.totalRecords=[]
    console.log('jh', page);
    this.pageNumber=page;
    console.log('jh', this.pageNumber);
    
    this.getlist()
  }

  viewDetails(id){
   // console.log('jhjh', 'hhjh');
   this.viewtx=false;
  this.viewTransaction=false;
  
   this.temp=id;
   console.log('Ram',this.temp)
   // this.viewTransaction=true;
    this.service.get('wallet/admin-basic-exchange/get-user-trading-history-detail?basicTradeHistoryId='+this.temp).subscribe((res:any)=>{
      if(res['status']==200){
       // this.viewTransaction=true;
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


back(){
  this.viewtx=true;
}
  
  viewtxn(id){
    this.router.navigate([''],{queryParams:{id:id}})
    console.log('sudha',id)

  }
  tokenedit(id){
    this.router.navigate(['/edit-token'],{queryParams:{id:id}})
    console.log('sudha',id)

  }
  view(id){
    this.router.navigate(['/view-token'],{queryParams:{id:id}})
    console.log('sudha',id)

  }
  // price details
  getPrice(){
  //   var url = "wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+'XLM'+"&storageType=HOT"  
    
  //   this.service.showSpinner();
  //   this.service.get(url).subscribe(res=>{
  
  //     this.service.hideSpinner();
  //     if(res['status']== 200){      
  //      this.priceData = res['data']
  //     }else {
  //       this.service.toasterErr(res['message']);
  //     }
  //   },err=>{
    
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })
  }

  // get avt price
  getAvtPrice(){
  //   var url = "wallet/admin/admin/get-AVT-price-inUsd?coin="+'AVT'  
  //   this.service.showSpinner();
  //   this.service.get(url).subscribe(res=>{
    
  //     this.service.hideSpinner();
  //     if(res['status']== 200){      
  //      this.priceDataa = res['data']
  //     }else {
  //       this.service.toasterErr(res['message']);
  //     }
  //   },err=>{
    
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })
  }



  // Change(){
  //   let priseInUsd=this.priceForm.value.price;
  //   var url = "wallet/admin/admin/set-AVT-price-inUsd?coin="+'AVT'+"&priseInUsd="+priseInUsd
    
  //   this.service.showSpinner();
  //   this.service.post(url,'').subscribe(res=>{
    
  //     this.service.hideSpinner();
  //     if(res['status']== 200){    
  //       this.priceForm.reset()  
  //      this.priceDataa = res['data']
  //     }else {
  //       this.service.toasterErr(res['message']);
  //     }
  //   },err=>{
    
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })

  // }

  //  buy Transaction
  buyGetTransaction(){
  //   var url = "wallet/admin-basic-exchange/get-avt-buy-order?page="+(this.pageNumber-1)+ "&pageSize=10"
    
  //   this.service.showSpinner();
  //   this.service.get(url).subscribe(res=>{
    
  //     this.service.hideSpinner();
  //     if(res['status']== 200){    
  //       this.priceForm.reset()  
  //      this.buyTransactionData = res['data']['data']['content']
  //      this.transactionLength = res['data']['data'].totalPages;
  //     }else {
  //       this.service.toasterErr(res['message']);
  //     }
  //   },err=>{
    
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })

}

//  withdraw Transaction
  withdrawGetTransaction(){
//   var url = "wallet/admin/transaction-history/get-all-transaction-history?page="+(this.pageNumber-1)+ "&pageSize=10"+"&coinName=AVT"+"&txnType=WITHDRAW"
  
//   this.service.showSpinner();
//   this.service.get(url).subscribe(res=>{
  
//     this.service.hideSpinner();
//     if(res['status']== 200){    
//       this.priceForm.reset()  
//      this.withdrawTransactionData = res['data']['resultlist']
//      this.transactionLength = res['data'].size
//     }else {
//       this.service.toasterErr(res['message']);
//     }
//   },err=>{
  
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       this.service.toasterErr('Unauthorized Access');
//     }else{
//     this.service.toasterErr('Something Went Wrong');
//  }
//   })

}

  //  admin Transaction
  // adminTransfer(){
  //   var url = "wallet/admin/transaction-history/get-all-transaction-history?page="+(this.pageNumber-1)+ "&pageSize=10"+"&coinName=AVT"+"&txnType=AVT_TRANSFER"
    
  //   this.service.showSpinner();
  //   this.service.get(url).subscribe(res=>{
    
  //     this.service.hideSpinner();
  //     if(res['status']== 200){    
  //       this.priceForm.reset()  
  //      this.transferData = res['data']['resultlist']
  //      this.transactionLength = res['data'].size
  //     }else {
  //       this.service.toasterErr(res['message']);
  //     }
  //   },err=>{
    
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })
  
  // }

  transfer(){
//   let data={
//     'amount':this.transferForm.value.price,
//     'toAddress':this.transferForm.value.address,
//     'coinName':this.transferForm.value.coin,
//   }
//   var url = "wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold"
  
//   this.service.showSpinner();
//   this.service.post(url,data).subscribe(res=>{
  
//     this.service.hideSpinner();
//     if(res['status']== 200){    
//       this.service.toasterSucc('Token transfer successfully');
//       this.selectTab('Price')
//       this.transferForm.reset()  
//      this.priceDataa = res['data']
//     }else {
//       this.service.toasterErr(res['message']);
//     }
//   },err=>{
  
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       this.service.toasterErr('Unauthorized Access');
//     }else{
//     this.service.toasterErr('Something Went Wrong');
//  }
//   })

}








  //========modal=======//
  delete(){
    $('#deleteModal').modal('show')
  }
  deleteUser(){
    $('#deleteModal').modal('hide')
  }
  block(){
    $('#block').modal('show')
  }
  blockUser(){
    $('#block').modal('hide')
  }
  // view(){
  //   this.router.navigate(['/view-token'])
  // }

  edit(){
    this.router.navigate(['/edit-token'])
  }
  addToken(){
    this.router.navigate(['/add-token'])
  }

}
