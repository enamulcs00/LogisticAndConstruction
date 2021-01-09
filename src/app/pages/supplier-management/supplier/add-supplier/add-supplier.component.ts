import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  AddSupplerForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
  }
  formValidation() {
    this.AddSupplerForm = new FormGroup({
      'emailId': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'mobileNumber': new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'companyName': new FormControl('', [Validators.required]),
      'companyAddress': new FormControl('', [Validators.required]),
      'cityName': new FormControl('', [Validators.required]),
      'stateName': new FormControl('', [Validators.required]),
      'AadharNumber': new FormControl('', [Validators.required]),
      'panNumber': new FormControl('', [Validators.required]),
      'gstNumber': new FormControl('', [Validators.required]),

    })
  }
}
