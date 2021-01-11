import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListOfCompanyComponent } from './pages/company-management/company/list-of-company/list-of-company.component';
import { AddCompanyComponent } from './pages/company-management/company/add-company/add-company.component';
import { EditCompanyComponent } from './pages/company-management/company/edit-company/edit-company.component';
import { ViewCompanyComponent } from './pages/company-management/company/view-company/view-company.component';
import { DeleteCompanyComponent } from './pages/company-management/company/delete-company/delete-company.component';
import { ListOfSitesComponent } from './pages/company-management/sites/list-of-sites/list-of-sites.component';
import { ListOfCompanyUserComponent } from './pages/company-management/company-user-management/list-of-company-user/list-of-company-user.component';
import { ListOfCompanyBookingComponent } from './pages/company-management/bookings/list-of-company-booking/list-of-company-booking.component';
import { ListOfCompanyQuoteComponent } from './pages/company-management/quotes/list-of-company-quote/list-of-company-quote.component';
import { ListOfCompanyBillingComponent } from './pages/company-management/billing/list-of-company-billing/list-of-company-billing.component';
import { AddSitesComponent } from './pages/company-management/sites/add-sites/add-sites.component';
import { EditSitesComponent } from './pages/company-management/sites/edit-sites/edit-sites.component';
import { ViewSitesComponent } from './pages/company-management/sites/view-sites/view-sites.component';
import { DeleteSitesComponent } from './pages/company-management/sites/delete-sites/delete-sites.component';
import { AddCompanyUserComponent } from './pages/company-management/company-user-management/add-company-user/add-company-user.component';
import { EditCompanyUserComponent } from './pages/company-management/company-user-management/edit-company-user/edit-company-user.component';
import { ViewCompanyUserComponent } from './pages/company-management/company-user-management/view-company-user/view-company-user.component';
import { DeleteCompanyUserComponent } from './pages/company-management/company-user-management/delete-company-user/delete-company-user.component';
import { ViewCompanyBookingComponent } from './pages/company-management/bookings/view-company-booking/view-company-booking.component';
import { ViewCompanyQuoteComponent } from './pages/company-management/quotes/view-company-quote/view-company-quote.component';
import { ViewCompanyBillingComponent } from './pages/company-management/billing/view-company-billing/view-company-billing.component';
import { ListOfFleetOwnerComponent } from './pages/fleet-management/fleet-owner/list-of-fleet-owner/list-of-fleet-owner.component';
import { AddFleetOwnerComponent } from './pages/fleet-management/fleet-owner/add-fleet-owner/add-fleet-owner.component';
import { EditFleetOwnerComponent } from './pages/fleet-management/fleet-owner/edit-fleet-owner/edit-fleet-owner.component';
import { ViewFleetOwnerComponent } from './pages/fleet-management/fleet-owner/view-fleet-owner/view-fleet-owner.component';
import { DeleteFleetOwnerComponent } from './pages/fleet-management/fleet-owner/delete-fleet-owner/delete-fleet-owner.component';
import { ListOfTruckComponent } from './pages/fleet-management/trucks/list-of-truck/list-of-truck.component';
import { AddTruckComponent } from './pages/fleet-management/trucks/add-truck/add-truck.component';
import { EditTruckComponent } from './pages/fleet-management/trucks/edit-truck/edit-truck.component';
import { ViewTruckComponent } from './pages/fleet-management/trucks/view-truck/view-truck.component';
import { DeleteTruckComponent } from './pages/fleet-management/trucks/delete-truck/delete-truck.component';
import { ListOfDriverComponent } from './pages/fleet-management/driver/list-of-driver/list-of-driver.component';
import { AddDriverComponent } from './pages/fleet-management/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './pages/fleet-management/driver/edit-driver/edit-driver.component';
import { ViewDriverComponent } from './pages/fleet-management/driver/view-driver/view-driver.component';
import { DeleteDriverComponent } from './pages/fleet-management/driver/delete-driver/delete-driver.component';
import { RoutesComponent } from './pages/fleet-management/routes/routes.component';
import { ListOfSupplierComponent } from './pages/supplier-management/supplier/list-of-supplier/list-of-supplier.component';
import { AddSupplierComponent } from './pages/supplier-management/supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './pages/supplier-management/supplier/edit-supplier/edit-supplier.component';
import { ViewSupplierComponent } from './pages/supplier-management/supplier/view-supplier/view-supplier.component';
import { DeleteSupplierComponent } from './pages/supplier-management/supplier/delete-supplier/delete-supplier.component';
import { ListOfSupplierBookingComponent } from './pages/supplier-management/bookings/list-of-supplier-booking/list-of-supplier-booking.component';
import { ViewSupplierBookingComponent } from './pages/supplier-management/bookings/view-supplier-booking/view-supplier-booking.component';
import { ListOfSupplierQuoteComponent } from './pages/supplier-management/quotes/list-of-supplier-quote/list-of-supplier-quote.component';
import { ViewSupplierQuoteComponent } from './pages/supplier-management/quotes/view-supplier-quote/view-supplier-quote.component';
import { ListOfSupplierBillingComponent } from './pages/supplier-management/billing/list-of-supplier-billing/list-of-supplier-billing.component';
import { ViewSupplierBillingComponent } from './pages/supplier-management/billing/view-supplier-billing/view-supplier-billing.component';
import { TruckTypeComponent } from './pages/truck-type/truck-type.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { ThermalPlantsComponent } from './pages/thermal-plants/thermal-plants.component';
import { CrushersAndMiningInfoComponent } from './pages/crushers-and-mining-info/crushers-and-mining-info.component';
import { ContactUsComponent } from './pages/others/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './pages/others/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/others/privacy-policy/privacy-policy.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'forgot_password', component: ForgotPasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // dashboard
  { path: 'dashboard', component: DashboardComponent },

  // company management
  { path: 'list-of-companies', component: ListOfCompanyComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'view-company', component: ViewCompanyComponent },
  { path: 'delete-company', component: DeleteCompanyComponent },
  // company management-> site
  { path: 'list-of-sites', component: ListOfSitesComponent },
  { path: 'add-site', component: AddSitesComponent },
  { path: 'edit-site', component: EditSitesComponent },
  { path: 'view-site', component: ViewSitesComponent },
  { path: 'delete-site', component: DeleteSitesComponent },
  // // company management-> company-user-management
  { path: 'list-of-company-user', component: ListOfCompanyUserComponent },
  { path: 'add-company-user', component: AddCompanyUserComponent },
  { path: 'edit-company-user', component: EditCompanyUserComponent },
  { path: 'view-company-user', component: ViewCompanyUserComponent },
  { path: 'delete-company-user', component: DeleteCompanyUserComponent },
  // company management-> booking
  { path: 'list-of-company-booking', component: ListOfCompanyBookingComponent },
  { path: 'view-company-booking', component: ViewCompanyBookingComponent },
  // company management-> quotes
  { path: 'list-of-company-quote', component: ListOfCompanyQuoteComponent },
  { path: 'view-company-quote', component: ViewCompanyQuoteComponent },
  // company management-> billing
  { path: 'list-of-company-billing', component: ListOfCompanyBillingComponent },
  { path: 'view-company-billing', component: ViewCompanyBillingComponent },

  // fleet management
  { path: 'list-of-fleet-owner', component: ListOfFleetOwnerComponent },
  { path: 'add-fleet-owner', component: AddFleetOwnerComponent },
  { path: 'edit-fleet-owner', component: EditFleetOwnerComponent },
  { path: 'view-fleet-owner', component: ViewFleetOwnerComponent },
  { path: 'delete-fleet-owner', component: DeleteFleetOwnerComponent },
  // fleet management-> truck
  { path: 'list-of-truck', component: ListOfTruckComponent },
  { path: 'add-truck', component: AddTruckComponent },
  { path: 'edit-truck', component: EditTruckComponent },
  { path: 'view-truck', component: ViewTruckComponent },
  { path: 'delete-truck', component: DeleteTruckComponent },
  // fleet management-> driver
  { path: 'list-of-driver', component: ListOfDriverComponent },
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'edit-driver', component: EditDriverComponent },
  { path: 'view-driver', component: ViewDriverComponent },
  { path: 'delete-driver', component: DeleteDriverComponent },
  // fleet management-> routes
  { path: 'routes', component: RoutesComponent },

  // supplier management
  { path: 'list-of-supplier', component: ListOfSupplierComponent },
  { path: 'add-supplier', component: AddSupplierComponent },
  { path: 'edit-supplier', component: EditSupplierComponent },
  { path: 'view-supplier', component: ViewSupplierComponent },
  { path: 'delete-supplier', component: DeleteSupplierComponent },
  // supplier management-> booking
  { path: 'list-of-supplier-booking', component: ListOfSupplierBookingComponent },
  { path: 'view-supplier-booking', component: ViewSupplierBookingComponent },
  // supplier management-> quotes
  { path: 'list-of-supplier-quote', component: ListOfSupplierQuoteComponent },
  { path: 'view-supplier-quote', component: ViewSupplierQuoteComponent },
  // supplier management-> billing
  { path: 'list-of-supplier-billing', component: ListOfSupplierBillingComponent },
  { path: 'view-supplier-billing', component: ViewSupplierBillingComponent },

  // truck
  { path: 'truck-type', component: TruckTypeComponent },

  // materials
  { path: 'materials', component: MaterialsComponent },

  // thermal plants
  { path: 'thermal-plants', component: ThermalPlantsComponent },

  // crusher and mining
  { path: 'crushers-and-mining', component: CrushersAndMiningInfoComponent },

  // others
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },

  // change password
  { path: 'change-password', component: ChangePasswordComponent },

  { path: 'footer', component: FooterComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
