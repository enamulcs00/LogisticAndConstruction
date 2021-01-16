import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-list-of-fleet-owner-billing',
  templateUrl: './list-of-fleet-owner-billing.component.html',
  styleUrls: ['./list-of-fleet-owner-billing.component.css']
})
export class ListOfFleetOwnerBillingComponent implements OnInit {
  listing: any = [];
  id: number;
  userid: number;
  userStatus: any;

  // pagination variable 
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any
  // search filter variable
  inVoiceNoForSupplier: any = '';
  supplierName: any = '';
  months: any = '';
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', formdate: '' }
  minAge: Date;

  fleetOnwerCompanyNameArray: any = [];
  supplierNameArraya: any = []
  monthsArray: any = [
    { id: '01', name: 'January' },
    { id: '02', name: 'February' },
    { id: '03', name: 'March' },
    { id: '04', name: 'April' },
    { id: '05', name: 'May' },
    { id: '06', name: 'June' },
    { id: '07', name: 'July' },
    { id: '08', name: 'August' },
    { id: '09', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ]

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
    this.dateValidation()
    this.getlist();
    this.getSupplierList(); // list of supplier for search filter
  }

  formdate() {
    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
  }

  // //----------------------date validation ----------------------//
  dateValidation() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  }


  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/filter-fleet-request-details?&page=${(this.currentPage - 1) + ('&pageSize=' + this.itemsPerPage)
      + (this.inVoiceNoForSupplier ? ('&inVoiceNoForSupplier=' + this.inVoiceNoForSupplier) : '') + (this.supplierName ? ('&supplierName=' + this.supplierName) : '')
      + (this.months ? ('&months=' + this.months) : ('&months=00'))
      + (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['list'];
        this.totalItems = res.data.totalCount
      } else {
        this.service.toasterErr(res.message)
        this.listing = []
        this.totalItems = 0
      }

    })
  }

  // ----------- search --------------- //
  search() {
    if (this.inVoiceNoForSupplier || this.supplierName || this.months || this.twoDate || this.fromDate) {
      this.currentPage = 1;
      this.getlist()
    }
  }

  // ------------ reset -------------- //
  reset() {
    if (this.inVoiceNoForSupplier || this.supplierName || this.months || this.twoDate || this.fromDate) {
      this.inVoiceNoForSupplier = ''
      this.supplierName = ''
      this.months = ''
      this.calender = { todate: '', formdate: '' }
      this.twoDate = ''
      this.fromDate = ''
      this.currentPage = 1
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
   * show supplier list in search filter
   */
  //----------------------------- get supplier owner list --------------------------------//
  getSupplierList() {
    var url = 'account/admin/filter-user-details?roleStatus=SUPPLIER'
    this.service.get(url).subscribe((res: any) => {
      if (res['status'] == 200) {
        this.supplierNameArraya = res['data']['list'];
      }
    })
  }

  // --------------- export to csv ------------------- //
  exportToCsv() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {
      let obj = {
        "Invoice No": element.inVoiceNoForCompany ? element.inVoiceNoForCompany : 'N/A',
        "Invoice Date": element.inVoiceDateForCompany ? element.inVoiceDateForCompany : 'N/A',
        "Fleet Owner": element.companyName ? element.companyName : 'N/A',
        "Supplier": element.supplierName ? element.supplierName : 'N/A',
        "Material": element.material ? element.material : 'N/A',
        "Weight": element.weight ? element.weight : 'N/A',
        "Delivery Date": String(element.deliveryDate) ? String(element.deliveryDate).slice(0, 10) : 'N/A',
        "Location": element.location ? element.location : 'N/A',
        "Amount": element.bidAmount ? element.bidAmount : 'N/A',
        "PO Number": element.poNumber ? element.poNumber : 'N/A',
        "Vehicle Number": element.truckNumber ? element.truckNumber : 'N/A',
        "Vehicle Type": element.truckType ? element.truckType : 'N/A',
        "Driver Name": element.driverName ? element.driverName : 'N/A',
        "Driver Mobile": element.driverMobileNo ? element.driverMobileNo : 'N/A',
        "Route ID": element.route ? element.route : 'N/A',
      }
      dataArr.push(obj)
    })
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'List Of Fleet Owner Billing',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ["Invoice ID", "Invoice Date", "Fleet Owner", "Supplier", "Material", "Weight", "Delivery Date", "Location", "Amount", "PO Number", "Vehicle Number", "Vehicle Type", "Driver Name", "Driver Mobile", "Route ID",]
    };
    new ngxCsv(dataArr, 'List-of-Fleet-Owner-Billing', options);
  }


  viewBilling(bookingId) {
    this.router.navigate(['/view-fleet-owner-billing', bookingId])
  }

}