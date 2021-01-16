import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  totalRecords: any
  pageNumber: number = 1
  itemsPerPage: number = 20
  userid: number;
  userStatus: any;
  fromDate: any;
  maxFromDate: string;
  maxToDate: string;
  minToDate: any;
  toDate: any;
  pageSize: any = 10;
  action: any;
  userstatus: any;

  stateArr: any = [];
  selectedState: any;
  cityArr: any

  // responseArray: any = []
  routeDataArray: any = []
  stateCityArray: any = []

  routeId: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, public service: MainService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
  }

  ngOnInit() {
    // this.getlist();
    this.addRoutesFormValidation()
    this.getStateList();
    this.getRouteOfUser();
  }



  //-----------------------------list api integration --------------------------------//
  // getlist() {
  // this.service.showSpinner()
  // var url = "account/admin/user-management/filter-user-details?page=" + (this.pageNumber - 1) + `&pageSize=${this.pageSize}`
  // this.service.get(url).subscribe((res: any) => {
  // this.service.hideSpinner()
  // if (res['status'] == 200) {
  // this.listing = this.responseArray
  // }
  // console.log('kfg', this.listing);
  // this.totalRecords = this.responseArray.length
  // console.log('kn', this.totalRecords);

  // })
  // }
  // // ------------------------pagination -------------------------//
  // pagination(page) {
  //   this.totalRecords = []
  //   console.log('jh', page);
  //   this.pageNumber = page;
  //   console.log('jh', this.pageNumber);

  //   this.getlist()
  // }


  //---------------------------------- Delete / Block Function--------------//
  openModal(action, routeId) {
    this.routeId = routeId;
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

  // //========modal=======//
  // delete(id: number) {
  //   this.userid = id;
  //   $('#deleteModal').modal('show')
  // }
  // //------------------------------delete api integration ----------------------------------//
  // deleteUser() {
  //   var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userid) + '&ipAddress=' + (localStorage.getItem('ipAddress')) + '&location=' + (localStorage.getItem('location'));
  //   this.service.get(url).subscribe((res: any) => {
  //     this.deleted = res
  //     if (this.deleted.ststus = 200) {
  //       $('#deleteModal').modal('hide')
  //       this.service.toasterSucc(this.deleted.message);
  //       this.getlist();
  //     }
  //   }, err => {
  //     this.service.hideSpinner();
  //     if (err['status'] == '401') {
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }
  //     else {
  //       this.service.toasterErr('Something Went Wrong');
  //     }
  //   })

  // }






  addRouteForm: FormGroup;
  addRoutesFormValidation() {
    this.addRouteForm = new FormGroup({
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required)
    })
  }
  //get State list
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

  //get city list
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


  // ---------------- submit route --------------- //
  submit() {
    var apiReqData = {
      // "supplyCityDto": [
      //   {
      //     "id": 0,
      //     "supplyCity": "string",
      //     "supplyState": "string"
      //   }
      // ]
      // supplyCityDto: this.stateCityArray
      supplyCityDto: [
        {
          'supplyCity': this.addRouteForm.value.city,
          "supplyState": this.addRouteForm.value.state
        }
      ]

    }
    console.log(apiReqData)
    let url = `account/admin/update-profile-other-role?userIdForUpdateprofile=${this.id}`
    console.log(url)
    this.service.showSpinner()
    this.service.post(url, apiReqData).subscribe((res: any) => {
      console.log(res);
      this.service.hideSpinner()
      if (res.status == 200) {
        // this.router.navigate(['/list-of-fleet-owner'])
        this.getRouteOfUser()
        this.service.toasterSucc("Route added successfully.")
        setTimeout(() => {
          this.addRouteForm.reset({
            'city': '',
            'state': ''
          });
          this.cityArr = []
        }, 100);
      }
    })
  }


  /**
   * edit route
   */

  //  ------------------ get route ---------------------- //
  getRouteOfUser() {
    this.service.showSpinner()
    let url = `account/admin/get-routes-of-user?fleetId=${this.id}`
    this.service.get(url).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.service.hideSpinner()
        this.routeDataArray = res.data
      } else {
        this.service.hideSpinner();
        this.service.toasterErr(res.message)
      }
    })
  }

  // --------------------- delete route -------------------- //
  deleteRouteOfUser() {
    console.log("route get")
    let url = `account/admin/delete-state-city?routeId=${this.routeId}`
    this.service.post(url, '').subscribe((res: any) => {
      if (res.status == 200) {
        this.getRouteOfUser()
        this.service.toasterSucc("Route deleted successfully.")
      } else {
        this.service.toasterErr(res.message)
      }
    })
  }

  back() {
    this.router.navigate(['/list-of-fleet-owner'])
  }
}
