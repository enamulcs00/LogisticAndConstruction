import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  editSupplerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.editSupplerFormValidation()
  }

  editSupplerFormValidation() {
    this.editSupplerForm = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'mobileNumber': new FormControl(''),
      'emailId': new FormControl('', Validators.required),
      'companyname': new FormControl('', Validators.required),
      'companyAddress': new FormControl(''),
      'cityname': new FormControl(''),
      'aadharNumber': new FormControl('', Validators.required),
      'panCardNumber': new FormControl('', Validators.required),
      'gstinNumber': new FormControl(''),
    })
  }
}
