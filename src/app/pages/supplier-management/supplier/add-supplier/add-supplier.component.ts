import { Router, ActivatedRoute } from '@angular/router';
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
  // AdharcardFile = ''
  // PanCardFile = ''
  // GstFile = ''
  // fileName:any;
  aadharCardUrl: any;
  panCardUrl: any;
  gstinUrl: any;
  stateArr: any = [];
  selectedState: any;
  cityArr: any;
  paramData: any;

  constructor(private activatedRoute: ActivatedRoute, public service: MainService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paramData = this.router.getCurrentNavigation().extras.state.paramData;
        console.log(this.paramData)
      }
    });
  }

  ngOnInit(): void {
    this.formValidation()
    this.getStateList()
    if (this.paramData) {
      let state = this.paramData.state ? this.paramData.state : ''
      this.patchCity(state)
      this.AddSupplerForm.patchValue({
        'firstName': this.paramData.firstName ? this.paramData.firstName : '',
        'lastName': this.paramData.lastName ? this.paramData.lastName : '',
        'mobileNumber': this.paramData.phoneNo ? this.paramData.phoneNo : '',
        'emailId': this.paramData.email ? this.paramData.email : '',
        'companyName': this.paramData.companyName ? this.paramData.companyName : '',
        'companyAddress': this.paramData.baseLocationAddress ? this.paramData.baseLocationAddress : '',
        'city': this.paramData.city ? this.paramData.city : '',
        'state': this.paramData.state ? this.paramData.state : '',
        'AadharNumber': this.paramData.aadharCardNo ? this.paramData.aadharCardNo : '',
        'panNumber': this.paramData.panCardNo ? this.paramData.panCardNo : '',
        'gstNumber': this.paramData.gstInNo ? this.paramData.gstInNo : '',
      })
      this.AddSupplerForm.disable()
    }
  }

  // handleInputChange(e,identity) {
  //   //this.fileName = identity;
  //   console.log("This is",identity)
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

  //   var reader = new FileReader();
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }
  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   if(this.fileName=='AADHAR'){
  //   this.AdharcardFile = reader.result;
  //   console.log('This is',this.fileName)
  //   }
  //   else if(this.fileName=='PAN'){
  //     this.PanCardFile = reader.result;
  //     console.log('This is',this.fileName)
  //   }
  //   else if(this.fileName=='GST'){
  //     this.GstFile = reader.result;
  //     console.log('This is',this.fileName)
  //   }
  // }


  formValidation() {
    let panPattern = "^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"
    let Gstpattern = "^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}$"
    let AadharPattern = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";

    this.AddSupplerForm = new FormGroup({
      'emailId': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'mobileNumber': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'companyName': new FormControl('', [Validators.required]),
      'companyAddress': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'AadharNumber': new FormControl('', [Validators.pattern(AadharPattern)]),
      'panNumber': new FormControl('', [Validators.pattern(panPattern)]),
      'gstNumber': new FormControl('', [Validators.pattern(Gstpattern)]),

    })
  }
  getStateList() {
    this.service.showSpinner()
    var url = "account/get-state-country-wise?countryName=" + 'INDIA'
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.stateArr = res['data'];
      }
    })
  }
  searchCity(event) {
    console.log("event", event)
    this.service.showSpinner()
    this.selectedState = event.target.value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.cityArr = res['data'];
      }
    })
  }
  // ----------- patch city when comes from unverified signup data page --------------- //
  patchCity(value) {
    console.log("city value", value)
    this.service.showSpinner()
    this.selectedState = value
    var url = "account/get-cities-state-wise?stateName=" + this.selectedState
    this.service.get(url).subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        // console.log(res.data.userDetail.city)
        this.cityArr = res['data'];
        this.AddSupplerForm.patchValue({
          'city': this.paramData.city ? this.paramData.city : ''
        })
      }
    })
  }


  AddSupplier() {
    let url = 'account/admin/add-CompanyBy-admin'
    let obj =
    {
      aadharCardNo: this.AddSupplerForm.value.AadharNumber,
      aadharCardUrl: this.aadharCardUrl,
      baseLocationAddress: this.AddSupplerForm.value.companyAddress,
      //countryCode: '+91',
      city: this.AddSupplerForm.value.city,
      companyName: this.AddSupplerForm.value.companyName,
      email: this.AddSupplerForm.value.emailId,
      firstName: this.AddSupplerForm.value.firstName,
      gstinNo: this.AddSupplerForm.value.gstNumber,
      gstinUrl: this.gstinUrl,
      lastName: this.AddSupplerForm.value.lastName,
      panCardNo: this.AddSupplerForm.value.panNumber,
      panCardUrl: this.panCardUrl,
      //phoneNo: this.AddSupplerForm.value.mobileNumber,
      // phoneNo: '+91' + this.AddSupplerForm.value.mobileNumber,
      phoneNo: this.AddSupplerForm.value.mobileNumber.startsWith('+91') ? this.AddSupplerForm.value.mobileNumber : '+91' + this.AddSupplerForm.value.mobileNumber,
      pnWithoutCountryCode: this.AddSupplerForm.value.mobileNumber,
      roleStatus: "SUPPLIER",
      state: this.AddSupplerForm.value.state,
    }
    if (this.paramData) {
      obj['idForValidateData'] = this.paramData.userId
    }
    this.service.showSpinner()
    this.service.post(url, obj).subscribe((res: any) => {
      this.service.hideSpinner()
      console.log('This is Add supplier Response', res);
      if (res.status == 200) {

        this.service.toasterSucc(res.message)
        this.router.navigate(['/list-of-supplier'])
        this.AddSupplerForm.reset()
      }
      else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, (err: any) => {
      this.service.hideSpinner()
      this.service.toasterErr('Something went wrong')
    }
    )
  }

  uploadAadhaar(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataAadhaar(fileData)
        // console.log("aadhaar card->", this.aadharCardUrl)
        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }

  uplaodPan(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataPan(fileData)
        // console.log("pan card->", this.panCardUrl)

        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }
  uplaodGst(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        let fileData = event.target.files[0];
        this.sendFormDataGst(fileData)
        // console.log("gst card->", this.gstinUrl)
        var reader = new FileReader()
      } else {
        //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
      }
    }
  }

  // handleInputChange(event) {
  //   var self = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var type = event.target.files[0].type;
  //     if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
  //       let fileData = event.target.files[0];
  //       this.sendFormData(fileData)
  //       var reader = new FileReader()
  //     } else {
  //       //this.service.showErrorMessage("Select only jpg,jpeg and png file.");
  //     }
  //   }

  // }

  /** to call form data infoNotification */
  sendFormDataAadhaar(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => {
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.aadharCardUrl = res.data

        console.log("aadhaar card->", this.aadharCardUrl)

      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      this.service.toasterErr(error.message)
    });
  }
  sendFormDataPan(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => {
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.panCardUrl = res.data
        console.log("pan card->", this.panCardUrl)


      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      this.service.toasterErr(error.message)
    });
  }
  sendFormDataGst(fileData) {
    let formdata = new FormData()
    formdata.append('file', fileData);
    this.service.showSpinner();

    // this.service.postApi('account/upload-file',formdata).subscribe(res => {
    this.service.post('account/upload-file', formdata).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        // this.userData = res['data'];
        // console.log('image', this.userData);
        // this.profile = (this.userData) ? this.userData : this.profile;
        // this.service.hideSpinner()
        this.service.toasterSucc(res['message'])

        console.log("upload data res=>>", res.data)
        this.gstinUrl = res.data

        console.log("gst card->", this.gstinUrl)

      } else {
        this.service.hideSpinner()
        this.service.toasterErr(res.message)
      }
    }, error => {
      this.service.hideSpinner();
      this.service.toasterErr(error.message)
    });
  }


}
