import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  data: any = [];

  constructor(public service: MainService) { }

  ngOnInit() {
    this.getTermsAndConditions()
  }

  // get terms and conditions
  getTermsAndConditions() {
    let url = `account/admin/get-static-content?pageKey=Terms And Condition`
    this.service.showSpinner();
    this.service.get(url).subscribe((res:any) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.data = res['data'];
        this.service.toasterSucc(res.message)
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
  saveTermsAndConditions() {
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
    this.service.post(url,obj).subscribe((res:any) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.getTermsAndConditions();
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

