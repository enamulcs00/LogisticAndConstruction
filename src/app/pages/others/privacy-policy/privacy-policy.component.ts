import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  data: any = [];

  constructor(public service: MainService,private router:Router) { }

  ngOnInit() {
    this.getPrivacyPolicy()
  }

  // get privacy policy
  getPrivacyPolicy() {
    let url =`account/admin/get-static-content?pageKey=Privacy Policy`
    this.service.showSpinner();
    this.service.get(url).subscribe((res:any) => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.data = res['data'];
        console.log('This is policydata',this.data)
      }
      else{
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

  // save terms and conditions
  savePrivacyPolicy() {
    let url  = `account/admin/static-content/update-static-content`
let obj = {
  "contentId": this.data.staticId,
  "pageData": this.data.pageData,
  "pageKey": this.data.pageKey
}

    var apiReq = {
      "pageKey": "Terms And Condition",
      "pageData": this.data.pageData
    }
    this.service.showSpinner();
    this.service.post(url, obj).subscribe((res:any) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.getPrivacyPolicy();
        this.service.toasterSucc(res.message)

      } else {
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

