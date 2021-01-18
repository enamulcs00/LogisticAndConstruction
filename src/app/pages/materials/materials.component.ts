import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  listing: any = [];
  id: number;
  userid: number;
  action: any;
  addMaterialForm: FormGroup;

  // pagination variable
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: any

  constructor(public service: MainService) { }

  ngOnInit() {
    this.addMaterialFormValidation()
    this.getlist();
  }

  //-----------------------------list api integration --------------------------------//
  getlist() {
    this.service.showSpinner()
    var url = `account/admin/get-materialDetails?page=${(this.currentPage - 1) + '&pageSize=' + this.itemsPerPage}`
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.listing = res['data']['data']
        this.totalItems = res.data.count
      } else {
        this.listing = []
        this.totalItems = 0
      }
    })
  }

  // ------------------------pagination -------------------------//
  pagination(page) {
    this.currentPage = page;
    this.getlist()
  }

  //---------------------------------- Delete / Block Function--------------//
  openModal(action, userId) {
    this.userid = userId;
    this.action = action;
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')
    } else if (action == 'BLOCK') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }


  //------------------------------delete api integration ----------------------------------//
  deleteUser() {
    let apiReqData = {
      materialId: this.userid,
      isDeleted: true
    }
    var url = 'account/admin/changeStatus-material'
    this.service.showSpinner();
    this.service.post(url, apiReqData).subscribe((res: any) => {
      this.service.hideSpinner()
      if (res.ststus = 200) {
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.getlist();
      } else {
        $('#deleteModal').modal('hide')
        this.service.toasterErr(res.message);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access.');
      }
      else {
        this.service.toasterErr('Something went wrong.');
      }
    })
  }


  /**
   * ************************************************************************* Add Material *************************************
   * add material 
   */
  // ---------------- add material form validation ----------------- //
  addMaterialFormValidation() {
    this.addMaterialForm = new FormGroup({
      'materialType': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }

  // --------------- add material --------------------- //
  addMaterial() {
    let apiReqData = {
      description: this.addMaterialForm.value.description,
      materialType: this.addMaterialForm.value.materialType
    }
    console.log(apiReqData)
    this.service.showSpinner()
    let url = 'account/admin/add-material'
    this.service.post(url, apiReqData).subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner()
      if (res.status == 200) {
        this.service.toasterSucc('Material added successfully.')
        this.getlist()
        this.addMaterialForm.reset()
      }else{
        this.service.toasterErr(res.message)
      }
    })
  }

}