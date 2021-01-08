// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AngularMyDatePickerModule } from 'angular-mydatepicker';
// import { AngularEditorModule } from '@kolkov/angular-editor'
import { NgOtpInputModule } from  'ng-otp-input';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

// import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
// import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
// import { WalletManagementComponent } from './pages/dashboard/wallet-management/wallet-management.component';
// import { KycManagementComponent } from './pages/dashboard/kyc-management/kyc-management.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
// import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
// import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management.component';
// import { ViewTransactionComponent } from './pages/dashboard/view-transaction/view-transaction.component';
// import { HotColdWalletManagementComponent } from './pages/dashboard/hot-cold-wallet-management/hot-cold-wallet-management.component';
// import { StaticContentManagementComponent } from './pages/dashboard/static-content-management/static-content-management.component';
// import { AboutUsComponent } from './pages/dashboard/static-content-management/about-us/about-us.component';
// import { PrivacyPolicyComponent } from './pages/dashboard/static-content-management/privacy-policy/privacy-policy.component';
// import { TermsAndConditionsComponent } from './pages/dashboard/static-content-management/terms-and-conditions/terms-and-conditions.component';
// import { FeeManagementComponent } from './pages/dashboard/fee-management/fee-management.component';
// import { WithdrawalLimitComponent } from './pages/dashboard/withdrawal-limit/withdrawal-limit.component';
// import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
// import { WalletDetailsComponent } from './pages/dashboard/wallet-details/wallet-details.component';

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

// import { ProfitLossManagementComponent } from './pages/dashboard/profit-loss-management/profit-loss-management.component';
// import { UserDetailTradingComponent } from './pages/dashboard/user-detail-trading/user-detail-trading.component';
// import { LoginSessionActivityComponent } from './pages/dashboard/login-session-activity/login-session-activity.component';
// import { ViewUserTradingDetailComponent } from './pages/dashboard/view-user-trading-detail/view-user-trading-detail.component';
// import { ViewHotColdWalletManagementComponent } from './pages/dashboard/view-hot-cold-wallet-management/view-hot-cold-wallet-management.component';
// import { TokenManagementComponent } from './pages/dashboard/token-management/token-management.component';
// import { AddTokenComponent } from './pages/dashboard/add-token/add-token.component';
// import { EditTokenComponent } from './pages/dashboard/edit-token/edit-token.component';
// import { ViewTokenComponent } from './pages/dashboard/view-token/view-token.component';
// import { TicketManagementComponent } from './pages/dashboard/ticket-management/ticket-management.component';
// import { ViewTicketComponent } from './pages/dashboard/view-ticket/view-ticket.component';
// import { ReplyTicketComponent } from './pages/dashboard/reply-ticket/reply-ticket.component';
// import { SettingsComponent } from './pages/setting/settings/settings.component';
// import { TakerMakeFeeComponent } from './pages/setting/taker-make-fee/taker-make-fee.component';
// import { ViewLimitComponent } from './pages/setting/view-limit/view-limit.component';
// import { WithdrawlFeeComponent } from './pages/setting/withdrawl-fee/withdrawl-fee.component';
// import { WithdrawlLimitComponent } from './pages/setting/withdrawl-limit/withdrawl-limit.component';
// import { KycDetailComponent } from './pages/kyc-management/kyc-detail/kyc-detail.component';
// import { KycUpdateComponent } from './pages/kyc-management/kyc-update/kyc-update.component';
// import { ManageFeeComponent } from './pages/fee-management/manage-fee/manage-fee.component';
// import { StandardTradingFeeComponent } from './pages/fee-management/standard-trading-fee/standard-trading-fee.component';
// import { MinTradingFeeComponent } from './pages/fee-management/min-trading-fee/min-trading-fee.component';
// import { UserManagementAdminComponent } from './pages/admin-management/user-management-admin/user-management-admin.component';
// import { AdminDetailComponent } from './pages/admin-management/admin-detail/admin-detail.component';
// import { AddAdministerComponent } from './pages/admin-management/add-administer/add-administer.component';
// import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
// import { ContentManagementComponent } from './pages/dashboard/content-management/content-management.component';
// import { DepositeWalletComponent } from './pages/dashboard/deposite-wallet/deposite-wallet.component';
// import { ViewFeeComponent } from './pages/dashboard/view-fee/view-fee.component';
// import { UpdateWithdrawlAmountComponent } from './pages/fee-management/update-withdrawl-amount/update-withdrawl-amount.component';
// import { MinWithdrawlAmountComponent } from './pages/fee-management/min-withdrawl-amount/min-withdrawl-amount.component';
// import { WithdrawLimitComponent } from './pages/dashboard/withdraw-limit/withdraw-limit.component';
// import { HotWalletManagementComponent } from './pages/dashboard/hot-wallet-management/hot-wallet-management.component';

// import { CKEditorModule } from 'ngx-ckeditor';
// import { FaqComponent } from './pages/faq-management/faq/faq.component';
// import { AddFaqComponent } from './pages/faq-management/add-faq/add-faq.component';
// import { EditFaqComponent } from './pages/faq-management/edit-faq/edit-faq.component';
// import { AnnouncementComponent } from './pages/announcement-management/announcement/announcement.component';
// import { AddAnnouncementComponent } from './pages/announcement-management/add-announcement/add-announcement.component';
// import { EditAnnouncementComponent } from './pages/announcement-management/edit-announcement/edit-announcement.component';
// import { ViewAnnouncementComponent } from './pages/announcement-management/view-announcement/view-announcement.component';
// import { AllUserTraderComponent } from './pages/dashboard/all-user-trader/all-user-trader.component';
// import { FiatComponent } from './pages/fiat-management/fiat/fiat.component';
// import { SendMoneyComponent } from './pages/fiat-management/send-money/send-money.component';

import { FooterComponent } from './pages/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListOfCompanyComponent } from './pages/company-management/company/list-of-company/list-of-company.component';
import { AddCompanyComponent } from './pages/company-management/company/add-company/add-company.component';
import { EditCompanyComponent } from './pages/company-management/company/edit-company/edit-company.component';
import { ViewCompanyComponent } from './pages/company-management/company/view-company/view-company.component';
import { DeleteCompanyComponent } from './pages/company-management/company/delete-company/delete-company.component';
import { ListOfSitesComponent } from './pages/company-management/sites/list-of-sites/list-of-sites.component';
import { AddSitesComponent } from './pages/company-management/sites/add-sites/add-sites.component';
import { EditSitesComponent } from './pages/company-management/sites/edit-sites/edit-sites.component';
import { ViewSitesComponent } from './pages/company-management/sites/view-sites/view-sites.component';
import { DeleteSitesComponent } from './pages/company-management/sites/delete-sites/delete-sites.component';
import { ListOfCompanyUserComponent } from './pages/company-management/company-user-management/list-of-company-user/list-of-company-user.component';
import { AddCompanyUserComponent } from './pages/company-management/company-user-management/add-company-user/add-company-user.component';
import { EditCompanyUserComponent } from './pages/company-management/company-user-management/edit-company-user/edit-company-user.component';
import { ViewCompanyUserComponent } from './pages/company-management/company-user-management/view-company-user/view-company-user.component';
import { DeleteCompanyUserComponent } from './pages/company-management/company-user-management/delete-company-user/delete-company-user.component';
import { ListOfCompanyBookingComponent } from './pages/company-management/bookings/list-of-company-booking/list-of-company-booking.component';
import { ViewCompanyBookingComponent } from './pages/company-management/bookings/view-company-booking/view-company-booking.component';
import { ListOfCompanyQuoteComponent } from './pages/company-management/quotes/list-of-company-quote/list-of-company-quote.component';
import { ViewCompanyQuoteComponent } from './pages/company-management/quotes/view-company-quote/view-company-quote.component';
import { ListOfCompanyBillingComponent } from './pages/company-management/billing/list-of-company-billing/list-of-company-billing.component';
import { ViewCompanyBillingComponent } from './pages/company-management/billing/view-company-billing/view-company-billing.component';

// import { ListOfCompaniesComponent } from './list-of-companies/list-of-companies.component';
// import { ListOfSitesComponent } from './list-of-sites/list-of-sites.component';
// import { CompanyUserManagementComponent } from './company-user-management/company-user-management.component';
// import { MyBookingComponent } from './my-booking/my-booking.component';
// import { QuotesComponent } from './quotes/quotes.component';
// import { BillingComponent } from './billing/billing.component';
// import { ListOfFleetOwnerComponent } from './list-of-fleet-owner/list-of-fleet-owner.component';
// import { ListOfTruckComponent } from './list-of-truck/list-of-truck.component';
// import { ListOfBidByFleetComponent } from './list-of-bid-by-fleet/list-of-bid-by-fleet.component';
// import { ListOfBookingDetailsComponent } from './list-of-booking-details/list-of-booking-details.component';
// import { BillingLatestComponent } from './billing-latest/billing-latest.component';
// import { ListOfDriverComponent } from './list-of-driver/list-of-driver.component';
// import { ListOfSupplierComponent } from './list-of-supplier/list-of-supplier.component';
// import { MyBookingSupplierComponent } from './my-booking-supplier/my-booking-supplier.component';
// import { QuotesSupplierComponent } from './quotes-supplier/quotes-supplier.component';
// import { BillingSupplierComponent } from './billing-supplier/billing-supplier.component';
// import { ListOfBidToFleetOwnerComponent } from './list-of-bid-to-fleet-owner/list-of-bid-to-fleet-owner.component';
// import { ListOfBookingDetailsFleetComponent } from './list-of-booking-details-fleet/list-of-booking-details-fleet.component';
// import { BillingFleetComponent } from './billing-fleet/billing-fleet.component';
// import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
// import { AddTruckTypeComponent } from './add-truck-type/add-truck-type.component';
// import { AddMaterialComponent } from './add-material/add-material.component';
// import { AddThermalPlantsComponent } from './add-thermal-plants/add-thermal-plants.component';
// import { UserRollManagementComponent } from './user-roll-management/user-roll-management.component';
// import { NotificationListMgtComponent } from './notification-list-mgt/notification-list-mgt.component';
// import { OthersComponent } from './others/others.component';
// import { AddCrushersComponent } from './add-crushers/add-crushers.component';
// import { SignupDataComponent } from './signup-data/signup-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    // DashboardComponent,
    // UserManagementComponent,
    // WalletManagementComponent,
    // KycManagementComponent,
    ForgotPasswordComponent,
    // MyProfileComponent,
    PageNotFoundComponent,
    // EditProfileComponent,
    // TransactionManagementComponent,
    // ViewTransactionComponent,
    // HotColdWalletManagementComponent,
    // StaticContentManagementComponent,
    // AboutUsComponent,
    // PrivacyPolicyComponent,
    // TermsAndConditionsComponent,
    // FeeManagementComponent,
    // WithdrawalLimitComponent,
    // UserDetailsComponent,
    // WalletDetailsComponent,
    ResetPasswordComponent,

    // ProfitLossManagementComponent,
    // UserDetailTradingComponent,
    // LoginSessionActivityComponent,
    // ViewUserTradingDetailComponent,
    // ViewHotColdWalletManagementComponent,
    // TokenManagementComponent,
    // AddTokenComponent,
    // EditTokenComponent,
    // ViewTokenComponent,
    // TicketManagementComponent,
    // ViewTicketComponent,
    // ReplyTicketComponent,
    // SettingsComponent,
    // TakerMakeFeeComponent,
    // ViewLimitComponent,
    // WithdrawlFeeComponent,
    // WithdrawlLimitComponent,
    // KycDetailComponent,
    // KycUpdateComponent,
    // ManageFeeComponent,
    // StandardTradingFeeComponent,
    // MinTradingFeeComponent,
    // UserManagementAdminComponent,
    // AdminDetailComponent,
    // AddAdministerComponent,
    // ChangePasswordComponent,
    // ContentManagementComponent,
    // DepositeWalletComponent,
    // ViewFeeComponent,
    // UpdateWithdrawlAmountComponent,
    // MinWithdrawlAmountComponent,
    // WithdrawLimitComponent,
    // HotWalletManagementComponent,
    // FaqComponent,
    // AddFaqComponent,
    // EditFaqComponent,
    // AnnouncementComponent,
    // AddAnnouncementComponent,
    // EditAnnouncementComponent,
    // ViewAnnouncementComponent,
    // AllUserTraderComponent,
    // FiatComponent,
    // SendMoneyComponent,
    FooterComponent,

    DashboardComponent,

    ListOfCompanyComponent,

    AddCompanyComponent,

    EditCompanyComponent,

    ViewCompanyComponent,

    DeleteCompanyComponent,

    ListOfSitesComponent,

    AddSitesComponent,

    EditSitesComponent,

    ViewSitesComponent,

    DeleteSitesComponent,

    ListOfCompanyUserComponent,

    AddCompanyUserComponent,

    EditCompanyUserComponent,

    ViewCompanyUserComponent,

    DeleteCompanyUserComponent,

    ListOfCompanyBookingComponent,

    ViewCompanyBookingComponent,

    ListOfCompanyQuoteComponent,

    ViewCompanyQuoteComponent,

    ListOfCompanyBillingComponent,

    ViewCompanyBillingComponent,
    
    // ListOfCompaniesComponent,
    // ListOfSitesComponent,
    // CompanyUserManagementComponent,
    // MyBookingComponent,
    // QuotesComponent,
    // BillingComponent,
    // ListOfFleetOwnerComponent,
    // ListOfTruckComponent,
    // ListOfBidByFleetComponent,
    // ListOfBookingDetailsComponent,
    // BillingLatestComponent,
    // ListOfDriverComponent,
    // ListOfSupplierComponent,
    // MyBookingSupplierComponent,
    // QuotesSupplierComponent,
    // BillingSupplierComponent,
    // ListOfBidToFleetOwnerComponent,
    // ListOfBookingDetailsFleetComponent,
    // BillingFleetComponent,
    // AddContactUsComponent,
    // AddTruckTypeComponent,
    // AddMaterialComponent,
    // AddThermalPlantsComponent,
    // UserRollManagementComponent,
    // NotificationListMgtComponent,
    // OthersComponent,
    // AddCrushersComponent,
    // SignupDataComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      maxOpened:1,
      preventDuplicates: true
    }),
    NgxSpinnerModule,
    NgxPaginationModule,
    // AngularMyDatePickerModule,
    // AngularEditorModule,
    // CKEditorModule
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }