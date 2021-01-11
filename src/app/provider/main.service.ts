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

@Injectable({
  providedIn: 'root'
})
export class MainService {
  loginSub = new BehaviorSubject(``);
  loginObs = this.loginSub.asObservable();
  code: string;
  httpOptions: { headers: HttpHeaders; };
  // public baseUrl = "http://182.72.203.245:1816/"
  // public baseUrl = "http://182.72.203.244:4032/" // stagging Url
  public baseUrl = "https://logistic-constructionbackend.mobiloitte.com/" // stagging domain Url

  // public baseUrl = "http://182.72.203.244:5065/"
  // public baseUrl = "http://182.72.203.244:3023/"
  // public baseUrl = "https://fullstackblockchain-java.mobiloitte.com/"
  // public baseUrl = "http://172.16.0.217:5065/"
  // public baseUrl = "http://172.16.0.217:5065/"
  // public baseUrl = "http://182.72.203.244:4042/"//prabhakar 
  //  public baseUrl = "https://java-stellarblockchain.mobiloitte.com/"
  // websiteURL = 'http://172.16.0.217:5065/'

  public websiteURL = "https://stellaradminpanel.mobiloitte.com/"
  // public websiteURL = "ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1649/"
  // public websiteURL = "https://fullstackblockchain-adminpanel.mobiloitte.com/"
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
        // headers: new HttpHeaders({ 'token': `${this.code}` })
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
        // headers: new HttpHeaders({ 'token': `${this.code}` })
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      }
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  // ------------ get third party api ---------- //
  getThirdPartyApi(url) {
    return this.http.get(url, { observe: 'response' })
  }

  // Form Data Api Structure
  // postApi(endPoint, data): Observable<any> {
  //   if (localStorage.getItem('Auth')) {
  //     this.code = localStorage.getItem('Auth')
  //   }
  //   if (localStorage.getItem('data') || localStorage.getItem('Auth')) {

  //     this.httpOptions = {
  //       headers: new HttpHeaders({ 'token': `${this.code}` })
  //     }
  //   }
  //   return this.http.post(this.baseUrl + endPoint, data, this.httpOptions);
  // }

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

}
