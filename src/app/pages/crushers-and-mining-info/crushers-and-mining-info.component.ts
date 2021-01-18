import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-crushers-and-mining-info',
  templateUrl: './crushers-and-mining-info.component.html',
  styleUrls: ['./crushers-and-mining-info.component.css']
})
export class CrushersAndMiningInfoComponent implements OnInit {
  data: any = [];

  constructor(public service: MainService) { }

  ngOnInit() {
    this.getCrusherAndMining()
  }

  // ------------- get creshur and mining ------------------ //
  getCrusherAndMining() {
    this.service.showSpinner();
    this.service.get('account/admin/get-static-content?pageKey=crushers and mining').subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.data = res['data'];
      } else {
        this.data = []
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

  // ------------- add crusher and mining first time -------------- //
  saveCrusherAndMining() {
    var apiReq = {
      "pageKey": "crushers and mining",
      "pageData": this.data.pageData
    }
    this.service.showSpinner();
    this.service.post('account/admin/static-content/add-new-static-content', apiReq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.getCrusherAndMining();
        this.service.toasterSucc('Crusher and mining updated successfully.')
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access.');
      } else {
        this.service.toasterErr('Something Went Wrong.');
      }
    })
  }

  // ------------ update creusher and mining --------------------- //
  updateCrusherAndMining() {
    var apiReq = {
      contentId: this.data.staticId,
      "pageKey": "crushers and mining",
      "pageData": this.data.pageData
    }
    this.service.showSpinner();
    this.service.post('account/admin/static-content/update-static-content', apiReq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.getCrusherAndMining();
        this.service.toasterSucc('Crusher and mining updated successfully.')
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access.');
      } else {
        this.service.toasterErr('Something Went Wrong.');
      }
    })
  }

}

