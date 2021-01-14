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
    this.service.showSpinner();
    this.service.get('static/get-static-page-data?pageKey=TERMS AND CONDITION').subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.data = res['data'];
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
    var apiReq = {
      "pageKey": "Terms And Condition",
      "pageData": this.data.pageData
    }
    this.service.showSpinner();
    this.service.post('static/update-static-content-data', apiReq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.getTermsAndConditions();
        this.service.toasterSucc('Terms & Condition Updated Successfully')
      } else {
        this.service.toasterErr('Terms & Condition Updated Successfully')
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

