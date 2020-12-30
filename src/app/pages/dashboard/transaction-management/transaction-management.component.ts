import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ExportToCsv } from 'export-to-csv';
declare var kendo: any;
declare var $: any
@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  transactionForm : FormGroup;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  txnData: any=[];
  pageNumber: number=1; 
 
  itemsPerPage:number=20;
  pageSize: any=10;
  totalRecords: any;
  listing: any = [];
  detail: any;
  txnid: any=[];
  coinData: any;
  changeType: any;
  coinCurrency: any;
  constructor(private router: Router, public service: MainService,private active:ActivatedRoute) {
    // this.active.queryParams.subscribe((params)=>{
    //   this.txnid=params.id
    //   console.log('sudha1',this.txnid)
    // })
   }

  ngOnInit() {
     this.transactionForm = new FormGroup({
       'startdate': new FormControl('', Validators.required),
       'enddate': new FormControl('', Validators.required),
       //'searchText': new FormControl(''),
       'type': new FormControl(''),
       'currency': new FormControl(''),
     })
    let date = new Date()
    this.fromDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getFullYear()
    this.toDate =(date.getDate() > 10 ? date.getDate(): '0'+date.getDate())+'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+'-'+ date.getFullYear()
    this.dateValidation()
    //this.getlist();
    this.transactionList();
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
  showList(val) {
    this.pageSize = val
    this.resetForm()
  }

  transactionList(){
    //var url = "wallet/admin-basic-exchange/get-all-users-trading-history?page=1&pageSize=10&userId=123";
    var url="wallet/admin-basic-exchange/get-all-users-trading-history?page="+(this.pageNumber-1) +`&pageSize=${this.pageSize}`+'&userId=123'
    this.service.get(url).subscribe((res:any)=>{
      //console.log('df', res);
      if(res['status']==200){
        this.txnData=res['data']['list'];
        this.coinList()
        console.log('sudha',this.txnData);
        // this.txnData.forEach(element => {
         // this.transaction=element.userId;
         // this.txnArr = localStorage.getItem('transaction') ? JSON.parse(localStorage.getItem('transaction')) ;
         //localStorage.setItem('txnArr',JSON.stringify(this.transaction))
         // console.log('h',this.userId);
         // this.coin.push(this.userId)
        // });
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

  // search by transaction 
  search(){
    var type=this.transactionForm.value.type;
    var currency=this.transactionForm.value.currency;
    var startdate=Date.parse(this.transactionForm.value.startdate);
    var enddate=Date.parse(this.transactionForm.value.enddate)
    let url  = `wallet/admin-basic-exchange/get-all-users-trading-history?page=${this.pageNumber-1}&pageSize=${this.pageSize}&userId=123`

    if(this.transactionForm.value.enddate && this.transactionForm.value.startdate){
      url = url + `&fromDate=${startdate}&toDate=${enddate}`
    }

    if(this.transactionForm.value.currency) {
      url = url + `&coin=${currency}`
    }

    if(this.transactionForm.value.type){
      url = url + `&orderType=${type}`
    }
    
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status']== 200 || 201){      
       this.txnData = res['data']['list']
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



  
  // search() {
    
  //   let startdate = Date.parse(this.transactionForm.value.startdate)
  //   console.log()
  //   let enddate = Date.parse(this.transactionForm.value.enddate)
  //   var search = this.transactionForm.value.searchText;
  //   if( this.transactionForm.value.searchText && this.transactionForm.value.startdate && this.transactionForm.controls.enddate.value){
  //     var url="wallet/admin-basic-exchange/get-all-users-trading-history?fromDate="+startdate+'&toDate='+enddate+'&search='+search+'&page=0'
  //   }
  //   else if(this.transactionForm.value.startdate && this.transactionForm.controls.enddate.value){
  //     var url1="wallet/admin-basic-exchange/get-all-users-trading-history?fromDate="+startdate+'&toDate='+enddate
  //   }

  //   else if(this.transactionForm.value.startdate && this.transactionForm.controls.enddate.value && this.transactionForm.value.searchText ){
  //     var url2="wallet/admin-basic-exchange/get-all-users-trading-history?fromDate="+startdate+'&toDate='+enddate+'&search='+search

  //   }
  //   this.service.get( url || url1 || url2).subscribe((res: any) => {
  //     this.txnData = res.data.list;
  //     console.log('kfg',this.txnData);
  //     this.totalRecords = res.data.totalCount
  //   })
  // }


  resetForm(){
    this.transactionForm.reset()
   this.transactionList();    
  }
  pagination(page){
    this.totalRecords=[]
    console.log('jh', page);
    this.pageNumber=page;
    console.log('jh', this.pageNumber);

    //this.getlist()
  }
  // viewDetails(){
  //   // console.log('jhjh', 'hhjh');
    
  //   // this.viewtransaction=false;
  //   // this.transaction=false;
  //    this.service.get('wallet/admin-basic-exchange/get-user-trading-history-detail?basicTradeHistoryId='+this.txnid).subscribe((res:any)=>{
  //      if(res['status']==200){
  //        this.detail=res.data
         
  //      }else if(res.status==205){
  //        this.service.toasterErr(res.message)
  //      }
  //    },
  //    err => {
  //      this.service.hideSpinner();
  //      if (err['status'] == '401') {
  //        this.service.onLogout();
  //        this.service.toasterErr('Unauthorized Access');
  //      } else {
  //        this.service.toasterErr('Something Went Wrong');
  //      }
  //    }
  //    )
 
  //  }
   view(id){
    this.router.navigate(['/view-transaction'],{queryParams:{id:id}})
    console.log('ddshhcdgghh',id)
    

  }
    //----------------------------------export User---------------------------------//
    //export User
  //export User

  exportAsXLSX() {
    let dataArr = [];
    this.txnData.forEach((element, ind) => {
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
  this.txnData.forEach((element,ind )=> {
    let obj ={}
    obj ={
      "S no": ind + 1,
      "Transaction ID": element.basicTradeHistoryId ? element.basicTradeHistoryId : '',
      "Transaction Type": element.orderType  ? element.orderType : '',
      "Base Coin": element.baseCoinName ? element.baseCoinName : 'N/A',
      "Executable Coin": element.execCoinName ? element.execCoinName : 'N/A',
      "Amount": element.baseCoinAmmount ? element.baseCoinAmmount : 'N/A',
      "Date": element.creationTime ? element.creationTime.slice(0, 10) : 'N/A',
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

typeChange(val) {
  this.changeType = val
}
showCurrency(val){
  this.coinCurrency = val
}



}