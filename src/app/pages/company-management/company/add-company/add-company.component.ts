import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
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
      'companyAddress': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'aadhaarNo': new FormControl(''),
      'panCard': new FormControl(''),
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
      companyAddress: this.addForm.value.companyAddress,
      city: this.addForm.value.city,
      state: this.addForm.value.state,
      aadhaarNo: this.addForm.value.aadhaarNo,
      panCard: this.addForm.value.panCard,
      gstNo: this.addForm.value.gstNo
    }
    console.log(apiReqData)
    this.router.navigate(['/list-of-companies'])
    // this.service.postApi('', apiReqData).subscribe((res: any) => {
    //   console.log(res);
    // })
  }

  uploadAadhaar() {

  }

  uplaodPan() {

  }
}
