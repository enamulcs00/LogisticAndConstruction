import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
 
  description:any;
  currUrl: any;
  title: any;


  id: any;
  privacy: any;
  dataa: any=[];

  constructor(private active: ActivatedRoute, public service: MainService,  public router:Router)
  {
    // this.active.queryParams.subscribe((params)=>{
    //   this.currUrl=params.tab
    //   console.log('jj', this.currUrl);
      
    // })

    this.active.params.subscribe(x=>{
    
      this.id= x['id'];
    })
    // this.getListCode();
    
   }

  ngOnInit() {
   // this.LanguageData();
  }

  // Get List Code
  getListCode(){
    this.service.showSpinner();
    this.service.get('static/get-static-page-data?pageKey=PRIVACY POLICY').subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){
        var data = res['data'];
        this.dataa = res['data'];
        // this.privacy = data.filter(x=>(x.staticContentId == this.id))
        console.log("hjyfsjy67is7fjsf",this.privacy)
      
      }
    }, err=>{
     
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  // Save Abou Us Functionality
  savePrivacy(){
    var apiReq = {
     "pageKey": "Privacy Policy",
     "pageData": this.dataa.pageData
   }
   this.service.showSpinner();
   this.service.post('static/update-static-content-data',apiReq).subscribe(res=>{
   
     this.service.hideSpinner();
     if(res['status']== 200){
       this.getListCode();
      this.service.toasterSucc('Privacy Policy Updated Successfully')
     }else{
       this.service.toasterErr('Privacy Policy Updated Successfully')
     }
   }, err=>{
   
     this.service.hideSpinner();
     if(err['status']=='401'){
       this.service.onLogout();
       this.service.toasterErr('Unauthorized Access');
     }else{
     this.service.toasterErr('Something Went Wrong');
  }
   })
   }

  // about language translator
  LanguageData(){
    // if(this.currUrl=='English'){
    //   this.privacyPolicy()
    // }
    // else if(this.currUrl=='German'){
    //   this.privacyPolicyGerman()
    // }
    // else if(this.currUrl=='Spanish'){
    //   this.privacyPolicySpanish()
    // }

  }
  // english
privacyPolicy(){
//    this.service.get(`static/get-static-page-data-by-page-key?pageKey=Privacy Policy`).subscribe((res:any)=>{
//      if(res.status==200){
//      this.privacy=res.data
//      this.title=this.privacy.pageKey
//     this.description=this.privacy.pageData
//      }

//   },err=>{
    
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       this.service.toasterErr('Unauthorized Access');
//     }else{
//     this.service.toasterErr('Something Went Wrong');
//  }
//   })
 }
 // german
privacyPolicyGerman(){
//   this.service.get(`static/get-german-static-page-data-by-page-key?pageKey=Datenschutzbestimmungen`).subscribe((res:any)=>{
//     if(res.status==200){
//     this.privacy=res.data
//     this.title=this.privacy.pageKey
//    this.description=this.privacy.pageData
//     }

//  },err=>{
   
//    this.service.hideSpinner();
//    if(err['status']=='401'){
//      this.service.onLogout();
//      this.service.toasterErr('Unauthorized Access');
//    }else{
//    this.service.toasterErr('Something Went Wrong');
// }
//  })
}
// spanish
privacyPolicySpanish(){
//   this.service.get(`static/get-spanish-static-page-data-by-page-key?pageKey=política de privacidad`).subscribe((res:any)=>{
//     if(res.status==200){
//     this.privacy=res.data
//     this.title=this.privacy.pageKey
//    this.description=this.privacy.pageData
//     }

//  },err=>{
   
//    this.service.hideSpinner();
//    if(err['status']=='401'){
//      this.service.onLogout();
//      this.service.toasterErr('Unauthorized Access');
//    }else{
//    this.service.toasterErr('Something Went Wrong');
// }
//  })
}

// update language
updateLanguageData(){
  // if(this.currUrl=='English'){
  //   this.updatePrivacyPolicy()
  // }
  // else if(this.currUrl=='German'){
  //   this.updateGermanPrivacyPolicy()
  // }
  // else if(this.currUrl=='Spanish'){
  //   this.updateSpanishPrivacyPolicy()
  // }
}

  // english
  updatePrivacyPolicy(){
  //   let request = {
  //     'pageData':this.description,
  //     'pageKey':this.title,
  //   }
  //  this.service.post(`static/update-static-content-data`,request).subscribe((res:any)=>{
  //    if (res.status=200) {
  //      this.service.toasterSucc(res.message)
  //      this.router.navigate(['/static-content-management'])
  //    }
  //   },err=>{
   
  //     this.service.hideSpinner();
  //     if(err['status']=='401'){
  //       this.service.onLogout();
  //       this.service.toasterErr('Unauthorized Access');
  //     }else{
  //     this.service.toasterErr('Something Went Wrong');
  //  }
  //   })
 }

 // german
 updateGermanPrivacyPolicy(){
//   let request = {
//     'pageData':this.description,
//     'pageKey':this.title,
//   }
//  this.service.post(`static/update-german-static-content-data`,request).subscribe((res:any)=>{
//    if (res.status=200) {
//      this.service.toasterSucc(res.message)
//      this.router.navigate(['/static-content-management'])
//    }
//   },err=>{
 
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       this.service.toasterErr('Unauthorized Access');
//     }else{
//     this.service.toasterErr('Something Went Wrong');
//  }
//   })
}

// spanish
updateSpanishPrivacyPolicy(){
//   let request = {
//     'pageData':this.description,
//     'pageKey':this.title,
//   }
//  this.service.post(`static/update-spanish-static-content-data`,request).subscribe((res:any)=>{
//    if (res.status=200) {
//      this.service.toasterSucc(res.message)
//      this.router.navigate(['/static-content-management'])
//    }
//   },err=>{
 
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       this.service.toasterErr('Unauthorized Access');
//     }else{
//     this.service.toasterErr('Something Went Wrong');
//  }
//   })
}

}
