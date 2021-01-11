import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-sites',
  templateUrl: './add-sites.component.html',
  styleUrls: ['./add-sites.component.css']
})
export class AddSitesComponent implements OnInit {

  addForm: FormGroup;

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.addFormValidation()
  }

  // add form validation
  addFormValidation() {
    this.addForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'mobileNo': new FormControl(''),
      'emainId': new FormControl(''),
      'companyName': new FormControl(''),
      'siteAddress': new FormControl(''),
      'siteName': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'gstNo': new FormControl('')
    })
  }

  // submit add form 
  submitForm() {
    let apiReqData = {
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      mobileNo: this.addForm.value.mobileNo,
      emainId: this.addForm.value.emainId,
      companyName: this.addForm.value.companyName,
      siteAddress: this.addForm.value.siteAddress,
      siteName: this.addForm.value.siteName,
      city: this.addForm.value.city,
      state: this.addForm.value.state,
      gstNo: this.addForm.value.gstNo
    }
    console.log(apiReqData)
    this.router.navigate(['/list-of-sites'])
    // this.service.postApi('', apiReqData).subscribe((res: any) => {
    //   console.log(res);
    // })
  }

}
