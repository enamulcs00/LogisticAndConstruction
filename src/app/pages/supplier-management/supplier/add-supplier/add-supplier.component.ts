import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  AddSupplerForm: FormGroup;
  constructor(public service:MainService ) {}

  ngOnInit(): void {
  this.formValidation()
  }
  formValidation() {
    let panPattern = "^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"
    let Gstpattern = "^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}$"
    let AadharPattern = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";



    this.AddSupplerForm = new FormGroup({
      'emailId': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'mobileNumber': new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'companyName': new FormControl('', [Validators.required]),
      'companyAddress': new FormControl('', [Validators.required]),
      'cityName': new FormControl('', [Validators.required]),
      'stateName': new FormControl('', [Validators.required]),
      'AadharNumber': new FormControl('', [Validators.required,Validators.pattern(AadharPattern)]),
      'panNumber': new FormControl('', [Validators.required,Validators.pattern(panPattern)]),
      'gstNumber': new FormControl('', [Validators.required,Validators.pattern(Gstpattern)]),

    })
  }
}
