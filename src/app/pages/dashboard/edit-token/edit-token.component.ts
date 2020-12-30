import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-token',
  templateUrl: './edit-token.component.html',
  styleUrls: ['./edit-token.component.css']
})
export class EditTokenComponent implements OnInit {
  addForm:FormGroup;
  profile: any;
  userdetail: any;
  userData: any;
  detail: any;
  coin: string;
  address: any;
  constructor(public route:Router,public service : MainService,private active:ActivatedRoute) { 
    this.active.queryParams.subscribe((params)=>{
      this.coin=params.id
     
    })
  }

  ngOnInit() {
    this.addForm= new FormGroup({
      'tokenname': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'decimal': new FormControl('', Validators.required),

      
    })
    this.viewaddress();
    this.viewdetail();
  }
  editToken(){
    this.service.showSpinner();

    let addFiatWalletDto  = {
     "coinDescription": "string",
     "coinFullName": "string",
     "coinImage": this.profile,
     "coinShortName": this.addForm.value.tokenname,
     "coinType": "string",
    // "coinShortName" : "token1",
     "contractAddress": this.addForm.value.address,
     "decimal": this.addForm.value.decimal,
     "depositText": "string",
     "price": this.addForm.value.price
 
    }
 
  this.service.post('wallet/admin/add-token-wallet',addFiatWalletDto).subscribe((res:any)=>{
   console.log('f', res);
   if(res.status==200){
     console.log(res)
     //this.subAdminData=res.data
     this.service.hideSpinner();
     this.service.toasterSucc(res['message'])
     this.route.navigate(['/token-management']);
     
   }
   else if(res.status==205){
     this.service.toasterErr(res.message)
   }
   
 }, err => {
   this.service.hideSpinner();
   if (err['status'] == '401') {
     this.service.onLogout();
     this.service.toasterErr('Unauthorized Access');
   } else {
     this.service.toasterErr('Something Went Wrong');
   }
 })
    //this.route.navigate(['/token-management'])
  }
  // handleInputChange(e) {
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }
  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   this.profile = reader.result;
  //   console.log("profile", this.profile)
  // }

  handleInputChange(event)
  {   
      
      var self = this;
      if (event.target.files && event.target.files[0]) {
        var type = event.target.files[0].type;
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          let fileData = event.target.files[0];
         this.sendFormData1(fileData)
        var reader = new FileReader()
        } else {
          //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
        }
      }

  }

  
sendFormData1(fileData) {
  let formdata = new FormData()
formdata.append('file', fileData);
this.service.showSpinner();

// this.service.postApi('account/upload-file',formdata).subscribe(res => {
  this.service.post('account/upload-file',formdata).subscribe((res:any)=>{
    
  if(res.status==200){
      this.service.hideSpinner()
      this.userData= res['data'];
      console.log('image', this.userData);
     this.profile = (this.userData) ? this.userData:this.profile;
      this.service.hideSpinner()
      this.service.toasterSucc(res['message'])
 }else{
    this.service.hideSpinner()
    this.service.toasterErr(res.message)
 }
}, error => {
  this.service.hideSpinner();
  // this.service.toasterErr(res.message)
});




 }


 viewaddress(){
  //var url= "wallet/coin/get-coin-details?coinName=XLM";
  //this.service.get(`wallet/coin/get-coin-details?coinName${=XLM`).subscribe((res:any)=>{
   // var url = "http://182.72.203.244:4042/wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+(this.coin)+"&storageType=HOT";

    this.service.get("wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+this.coin+"&storageType=HOT").subscribe((res:any)=>{
    if(res['status']==200 && res.data){
      this.addForm.patchValue({
        "address": res.data.address
      })
      
      
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
    if(res['status']==200 && res.data){
      this.addForm.patchValue({
        "decimal": res.data.decimalValue,
        "price" :res.data.marketPriceInUsd,
        "tokenname" : res.data.coinShortName
        
      })
      this.profile=res.data.coinImage
      
      
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
