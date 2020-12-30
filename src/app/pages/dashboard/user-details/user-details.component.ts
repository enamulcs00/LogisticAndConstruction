import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ExportToCsv } from 'export-to-csv';

declare var kendo: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  key:boolean=true;
  walletForm:FormGroup
  currTab : any ="GI"
  id:any;
  userID: any;
  userId: any = [];
  userDetail:any=[];
  tradingDetail: any;
  viewTransaction:boolean=true;
  transaction:boolean=true;
  loginSessionData: any={};
  pageNumber: number=1;
  coinData: any=[];
  userKyc: any=[];
  url: string;
  activatedRoute: any;
  email: any;
  obj: any;
  walletArr: any=[];
  itemsPerPage:number=20
  totalRecords: any;
  pageSize: any=10;
  transactionArr: any=[];
  transactionId: any;
  totalAmountInUSD: number;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  changeType: any;
  coinCurrency: any;
  viewUserObj: any;

  constructor(private route: ActivatedRoute, private router: Router, public service: MainService)
  {
    this.obj=this.route.params.subscribe((params)=>{
      this.id=params.id1
      console.log(params)
    })
    // let obj = this.route.queryParams.subscribe(params => {
    //   this.userId = (params['userId']); // (+) converts string 'id' to a number
    //   console.log("fhsgfsf", this.userId);
    //   this.email = (params['email']);
    // });
   }

  ngOnInit() {
    this.walletForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'currency' : new FormControl(''),
      'type' : new FormControl(''),

    })
    // -----------------date manage ----------------//
    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
    this.transactionApi()
   
    // this.walletvalidation();
    this.genralInformation()
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   if (params.tab) {
    //     this.currTab = params.currTab;
    //     this.router.navigate([], {
    //       queryParams: {
    //         currTab: 'Transaction',
    //       },
    //       queryParamsHandling: 'merge',
    //     });
    //   }
    // });
  }

  onFromChangeDate(){
    this.minToDate = this.fromDate;
  }
  onToChangeDate(){
    this.maxFromDate = this.toDate;
  }
//----------------------date validation ----------------------//
  dateValidation(){
    let date = new Date();
    let currentDay = date.getDate() >= 10 ? date.getDate(): '0'+ date.getDate();
    let currentMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1): '0'+date.getMonth();
    let currentYear = date.getFullYear();
    this.maxFromDate = currentYear + '-' + currentMonth + '-' + currentDay;
    this.maxToDate = currentYear + '-' + currentMonth + '-' + currentDay;

  }

  

  coinList(){
    var url = "wallet/coin/get-coin-list?page=" +(this.pageNumber-1)+ "&pageSize=11" ;
    this.service.get(url).subscribe((res:any)=>{
      console.log('df', res);
      if(res['status']==200){
        this.coinData=res['data']
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })

  }

  selectTab(tab ){
    this.currTab = tab;
    if(this.currTab === 'Wallet'){
      this.viewTransaction=true;
    this.transaction=false;
    this.walletApi()
      // this.router.navigate(['user-details'])
    }
   else if(this.currTab === 'Transaction'){
     this.transaction=true;
     this.viewTransaction=false;
    this.transactionApi()
    
    }
    else if (this.currTab === 'Login'){
      this.viewTransaction=true;
    this.transaction=false;
      this.loginSession()
    }
    else if (this.currTab === 'GI'){
      this.viewTransaction=true;
    this.transaction=false;
      this. genralInformation()
    }
  }
  viewDetails(){
    console.log('jhjh', 'hhjh');
    
    this.viewTransaction=false;
    this.transaction=false;
  }

  

  // api of Trading
   userTrading(){
  //   var url = "wallet/admin-basic-exchange/get-user-trading-history?page=" +(this.pageNumber-1)+ "&pageSize=10"+"&userId="+this.id  
  //   this.service.showSpinner();
  //   this.service.get(url).subscribe(res=>{
    
  //     this.service.hideSpinner();
  //     if(res['status']== 200){      
  //      this.tradingDetail = res['data']['list']
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

  // search by transaction 
  search(){
    var type=this.walletForm.value.type;
    var currency=this.walletForm.value.currency;
    var startdate=Date.parse(this.walletForm.value.startdate);
    var enddate=Date.parse(this.walletForm.value.enddate)
    let url  = `wallet/admin-basic-exchange/get-user-trading-history?page=${this.pageNumber-1}&pageSize=${this.pageSize}&userId=${this.id}`

    if(this.walletForm.value.enddate && this.walletForm.value.startdate){
      url = url + `&fromDate=${startdate}&toDate=${enddate}`
    }

    if(this.walletForm.value.currency) {
      url = url + `&coin=${currency}`
    }

    if(this.walletForm.value.type){
      url = url + `&orderType=${type}`
    }
    
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status']== 200 || 201){      
       this.transactionArr = res['data']['list']
      }else {
        this.service.toasterErr(res['message']);
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  reset(){
    this.walletForm.reset()
    this.transactionApi()   
  }

  // view user trading navigation
  viewUserTrading(id){
    this.transactionId = id
    // this.router.navigate(['/view-user-trading-detail'],{queryParams:{id:id}})
    this.service.showSpinner()
    this.service.get(`wallet/admin-basic-exchange/get-user-trading-history-detail?basicTradeHistoryId=${this.transactionId}`).subscribe(res=>{
      this.service.hideSpinner()
      if(res['status'] == 200){
        this.viewTransaction=true;
        this.viewUserObj = res['data']

      }
    },err=>{
      this.service.hideSpinner()
      if(err['status'] == 400||401){
        this.service.toasterErr(err['error'])
      }
    })
  }
  
//-----------------------------------genral information api integrate ---------------------------//
  genralInformation(){
    this.service.showSpinner()
    var url="account/admin/user-management/user-details?userId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner();
      if(res.status==200){
        this.userDetail=res.data;
        this.userKyc=res.data.kyc == null ? null : res.data.kyc.document[0]
      }
    
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  //------------------------------------wallet api integration ---------------------------------//
  walletApi(){
    this.service.showSpinner()
    this.service.get(`wallet/wallet/get-all-user-balance-and-coinlist-withName?userId=${this.id}`).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status'] == 205){
        this.service.toasterSucc(res['message'])
      }else if(res['status'] == 200){
        this.service.toasterSucc(res['message'])
        this.walletArr = res['data']['userBalance']
        this.totalAmountInUSD  = 0;
        this.walletArr.map(x=>{                                                        
          this.totalAmountInUSD= this.totalAmountInUSD+x.totalBalance
        })
        console.log('------->wallet data')
      }
    },err=>{
      this.service.hideSpinner();
      if(err.status == 400 || 401){
        this.service.toasterErr(err.error.message)
      }
    })

  }
//-----------------------transaction Api integration -------------------------------------------//
transactionApi(){
  this.service.showSpinner()
  this.service.get(`wallet/admin-basic-exchange/get-user-trading-history?page=${this.pageNumber-1}&pageSize=${this.pageSize}&userId=${this.id}`).subscribe(res=>{
    this.service.hideSpinner();
    if(res['status'] == 200){
      this.transactionArr = res['data']['list']
      this.coinList()
    }
  },err=>{
    this.service.hideSpinner();
    if(err.status == 400 || 401){
      this.service.toasterErr(err.error.message)
    }
  })
}
  // Api of login session activity
  loginSession(){
    this.service.showSpinner();
    var url="account/admin/user-management/get-user-last-login-activity?userId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      this.service.hideSpinner();
      if(res.status==200){
        this.service.toasterSucc(res.message)
        this.loginSessionData=res.data
      }
    },(err)=>{
      this.service.hideSpinner();
      if(err.status==401){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something went wrong')
      }
    })
  }

  //export User


exportAsXLSX() {
  let dataArr = [];
  this.transactionArr.forEach((element, ind) => {
    let obj ={}
    obj={
      "S no": ind + 1,
      "Transaction ID": element.basicTradeHistoryId ? element.basicTradeHistoryId : '',
      "Transaction Type": element.orderType  ? element.orderType : '',
      "Base Coin": element.baseCoinName ? element.baseCoinName : 'N/A',
      "Executable Coin": element.execCoinName ? element.execCoinName : 'N/A',
      "Amount": element.baseCoinAmmount ? element.baseCoinAmmount : 'N/A',
      "Date": element.creationTime ? element.creationTime.slice(0, 10) : 'N/A',
    }
    dataArr.push(obj)
  })

  this.service.exportAsExcelFile(dataArr, 'Admin User List');
}
 // ----------------------------------------export CSV
 ExportToCsv(){
  this.service.showSpinner()
  setTimeout( r => {
    this.service.hideSpinner()
  },3000)
  let listingArr=[]
  this.transactionArr.forEach((element,ind )=> {
    let obj ={}
    obj ={
      "S no": ind + 1,
      "Transaction ID": element.basicTradeHistoryId ?element.basicTradeHistoryId : '',
      "Transaction Type":element.orderType  ?element.orderType : '',
      "Base Coin":element.baseCoinName ?element.baseCoinName : 'N/A',
      "Executable Coin":element.execCoinName ?element.execCoinName : 'N/A',
      "Amount":element.baseCoinAmmount ?element.baseCoinAmmount : 'N/A',
      "Date":element.creationTime ?element.creationTime.slice(0, 10) : 'N/A',
    }
    listingArr.push(obj)
  });
  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Candidate Details CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  // const csvExporter = new ExportToCsv(options);
  //  csvExporter.generateCsv(listingArr); 
}


// pdf

exportPDF(){
  this.service.showSpinner();
  setTimeout( r => {
    this.service.hideSpinner()
  },3000);
  kendo.drawing
    .drawDOM("#pdfcontent",
      {
        paperSize: "A2",
        margin: { top: "0.8cm", bottom: "1cm" },
        scale: 0.8,
        height: 400,          
      })
    .then(function (group) {
      kendo.drawing.pdf.saveAs(group, "Exported.pdf")
    });
  
}

  
backTransaction(){
  this.currTab = 'Transaction'
  this.viewTransaction= false;
  console.log(this.viewTransaction)
}

 // ------------------------pagination -------------------------//
 pagination(page){
  this.totalRecords=[]
  console.log('jh', page);
  this.pageNumber=page;
  console.log('jh', this.pageNumber);
  this.transactionApi()
}

//--------------------------------pageSize ---------------------------------//
showList(val) {
  this.pageSize = val
  this.reset()
}

typeChange(val) {
  this.changeType = val
}
showCurrency(val){
  this.coinCurrency = val
}





}
