import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-list-of-truck',
  templateUrl: './list-of-truck.component.html',
  styleUrls: ['./list-of-truck.component.css']
})
export class ListOfTruckComponent implements OnInit {
  listing: any = [];
  // pagination variable
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  // search filter variable
  fleetOnwerCompanyName: any = '';
  registrationNo: any = '';
  typeOfTruck: any = '';
  fleetOnwerNo: any = '';

  fleetOnwerCompanyNameArray: any = [];
  typeOfTruckArray: any = []

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
    this.getlist(); // list of truck
    this.getFleetOwnerlist() // list of fleet owner for search filter
    this.getTruckTypelist() // list of truck type for search filter
  }

  //----------------------------- list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/filter-tuck-details?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.fleetOnwerCompanyName ? ('&fleetOnwerCompanyName=' + this.fleetOnwerCompanyName) : '')
      + (this.registrationNo ? ('&registrationNo=' + this.registrationNo) : '') + (this.typeOfTruck ? ('&typeOfTruck=' + this.typeOfTruck) : '') + (this.fleetOnwerNo ? ('&fleetOnwerNo=' + this.fleetOnwerNo) : '')}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
        this.totalItems = res.data.totalCount;
      } else {
        this.listing = []
        this.totalItems = 0
      }
    })
  }

  // ---------- search ----------- //
  search() {
    if (this.fleetOnwerCompanyName || this.registrationNo || this.typeOfTruck || this.fleetOnwerNo) {
      this.currentPage = 1;
      this.getlist()
    }
  }

  // ---------- reset ------------- //
  reset() {
    if (this.fleetOnwerCompanyName || this.registrationNo || this.typeOfTruck || this.fleetOnwerNo) {
      this.fleetOnwerCompanyName = ''
      this.registrationNo = ''
      this.typeOfTruck = ''
      this.fleetOnwerNo = ''
      this.currentPage = 1;
      setTimeout(() => {
        this.getlist()
      }, 200);
    }
  }

  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }

  /**
   * fleet owner list, truck type list
   * show fleet owner list in search filter
   * show truck type list in search filter
   */
  //----------------------------- get fleet owner list --------------------------------//
  getFleetOwnerlist() {
    var url = 'account/admin/filter-user-details?roleStatus=FLEET'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.fleetOnwerCompanyNameArray = res['data']['list'];
      }
    })
  }

  //----------------------------- get truck type list --------------------------------//
  getTruckTypelist() {
    var url = 'account/admin/get-truckTypeDetails?page=0&pageSize=100'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.typeOfTruckArray = res['data'];
      }
    })
  }

  // --------------- export to csv ------------------- //
  exportToCsv() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj = {
        "Fleet Owner Company": element.fleetOnwerCompanyName ? element.fleetOnwerCompanyName : 'N/A',
        "Truck Number": element.registrationNo ? element.registrationNo : 'N/A',
        "Truck Type": element.typeOfTruck ? element.typeOfTruck : 'N/A',
        "Mobile Fleet Owner": element.fleetOnwerNo ? element.fleetOnwerNo : 'N/A',
        "Date Of Creation": String(element.createTime) ? String(element.createTime).slice(0, 10) : 'N/A',
      }
      dataArr.push(obj)
    })
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'List Of Trucks',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ["Fleet Owner Company", "Truck Number", "Truck Type", "Mobile Fleet Owner", "Date Of Creation"]
    };
    new ngxCsv(dataArr, 'List-of-truck', options);
  }

  // --------------- add truck ------------ //
  addTruck() {
    this.router.navigate(['add-truck'])
  }

  // --------------- view truck ------------ //
  viewTruck(truckId) {
    this.router.navigate(['/view-truck', truckId])
  }

  // --------------- delete truck ------------ //
  deleteTruck(truckId) {
    this.router.navigate(['/delete-truck', truckId])
  }

}

