import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})
export class AddTokenComponent implements OnInit {
  addForm:FormGroup;
  profile: any;
  userData: any;
  constructor(private route:Router , public service : MainService) { }

  ngOnInit() {
    this.addForm= new FormGroup({
      'tokenimage': new FormControl('', Validators.required),
      'token_name': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'decimal': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      
    })
  }
  //addToken(){
    //this.route.navigate(['/token-management'])
  //}
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
     // this.profile = (this.userData) ? this.userData:this.profile;
      //this.service.hideSpinner()
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



 addToken(){
   this.service.showSpinner();

   let addFiatWalletDto  = {
    "coinDescription": "string",
    "coinFullName": "string",
    "coinImage": this.userData,
    "coinShortName": this.addForm.value.token_name,
    "coinType": "string",
    "contractAddress": this.addForm.value.address,
    "decimal": this.addForm.value.decimal,
    "depositText": "string",
    "price": this.addForm.value.price

   }

 this.service.post('wallet/admin/add-token-wallet',addFiatWalletDto).subscribe((res:any)=>{
  console.log('f', res);
  if(res.status==200){
    //this.adddata=res.data
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
  }

}
