import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class MainService {
  loginSub = new BehaviorSubject(``);
  loginObs = this.loginSub.asObservable();
  code: string;
  month: any;
  day: any;
  daily: string;
  year: number;
  dtToday: Date;
  maxDate: string;
  httpOptions: { headers: HttpHeaders; };
  // public baseUrl = "http://182.72.203.244:4032/" // stagging Url
  public baseUrl = "https://logistic-constructionbackend.mobiloitte.com/" // stagging domain Url

  // public websiteURL = "https://stellaradminpanel.mobiloitte.com/"
  // public websiteURL = ''

  constructor(public http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService, public routes: Router) { }

  // Header Managment
  changeLoginSub(msg) {
    this.loginSub.next(msg);
  }

  // ------------ post api -------------- //
  post(url, data) {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      };
    }
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }

  // ----------- get api ---------------- //
  get(url) {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      }
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  // ------------ get third party api ---------- //
  getThirdPartyApi(url) {
    return this.http.get(url, { observe: 'response' })
  }

  //Form Data Api Structure
  postApi(endPoint, data): Observable<any> {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      }
    }
    return this.http.post(this.baseUrl + endPoint, data, this.httpOptions);
  }

  // ------------- logout ------------- //
  onLogout() {
    localStorage.clear();
    // window.location.reload();
    this.routes.navigate(['/login']);
    // $('#signout_modal').modal('hide');
  }

  // ------------ Spinner ------------- //
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  // ---------- toaster ----------------- //
  toasterSucc(msg) {
    this.toastr.success(msg)
  }
  toasterErr(msg) {
    this.toastr.error(msg)
  }
  toasterInfo(msg) {
    this.toastr.info(msg)
  }

  // ------------ export excel file ------------- //
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  // ---------------- validation ------------------ //
  preventSpace(event) {
    if (event.charCode == 32 && !event.target.value) {
      event.preventDefault()
    }
  }

  AlphabetOnly(event) {
    let pattAlpha = /^([a-zA-Z ])*$/;
    let resultAlpha = pattAlpha.test(event.key);
    return resultAlpha;
  }

  numberOnly(event) {
    let Numpattern = /^([0-9])*$/;
    let resultNum = Numpattern.test(event.key);
    return resultNum;
  }

  BlockFuture() {
    $(() => {
      this.dtToday = new Date();
      this.month = this.dtToday.getMonth() + 1;
      this.day = this.dtToday.getDate();
      this.year = this.dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();
      this.maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#fromDate').attr('max', this.maxDate);
      $('#toDate').attr('max', this.maxDate);
    });
  }

}
