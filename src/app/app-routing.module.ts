import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 
// import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
// 

// import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
// import { KycManagementComponent } from './pages/dashboard/kyc-management/kyc-management.component';
// import { WalletManagementComponent } from './pages/dashboard/wallet-management/wallet-management.component';

// 
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// 

// import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile.component';
// import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
// import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management.component';
// import { ViewTransactionComponent } from './pages/dashboard/view-transaction/view-transaction.component';
// import { HotColdWalletManagementComponent } from './pages/dashboard/hot-cold-wallet-management/hot-cold-wallet-management.component';

// 
// import { StaticContentManagementComponent } from './pages/dashboard/static-content-management/static-content-management.component';
// import { TermsAndConditionsComponent } from './pages/dashboard/static-content-management/terms-and-conditions/terms-and-conditions.component';
// import { PrivacyPolicyComponent } from './pages/dashboard/static-content-management/privacy-policy/privacy-policy.component';
// import { AboutUsComponent } from './pages/dashboard/static-content-management/about-us/about-us.component';
// 

// import { FeeManagementComponent } from './pages/dashboard/fee-management/fee-management.component';
// import { WithdrawalLimitComponent } from './pages/dashboard/withdrawal-limit/withdrawal-limit.component';
// import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
// import { WalletDetailsComponent } from './pages/dashboard/wallet-details/wallet-details.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
// import { ProfitLossManagementComponent } from './pages/dashboard/profit-loss-management/profit-loss-management.component';
// import { UserDetailTradingComponent } from './pages/dashboard/user-detail-trading/user-detail-trading.component';
// import { LoginSessionActivityComponent } from './pages/dashboard/login-session-activity/login-session-activity.component';
// import { ViewUserTradingDetailComponent } from './pages/dashboard/view-user-trading-detail/view-user-trading-detail.component';
// import { HotWalletManagementComponent } from './pages/dashboard/hot-wallet-management/hot-wallet-management.component';
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

// 
// import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
// 

// import { ContentManagementComponent } from './pages/dashboard/content-management/content-management.component';
// import { AdminDetailComponent } from './pages/admin-management/admin-detail/admin-detail.component';
// import { AddAdministerComponent } from './pages/admin-management/add-administer/add-administer.component';
// import { DepositeWalletComponent } from './pages/dashboard/deposite-wallet/deposite-wallet.component';
// import { ViewFeeComponent } from './pages/dashboard/view-fee/view-fee.component';
// import { UpdateWithdrawlAmountComponent } from './pages/fee-management/update-withdrawl-amount/update-withdrawl-amount.component';
// import { MinWithdrawlAmountComponent } from './pages/fee-management/min-withdrawl-amount/min-withdrawl-amount.component';
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

// 
// import { QuotesSupplierComponent } from './quotes-supplier/quotes-supplier.component';
// import { QuotesComponent } from './quotes/quotes.component';
// import { MyBookingSupplierComponent } from './my-booking-supplier/my-booking-supplier.component';
// import { MyBookingComponent } from './my-booking/my-booking.component';
// import { ListOfTruckComponent } from './list-of-truck/list-of-truck.component';
// import { ListOfSupplierComponent } from './list-of-supplier/list-of-supplier.component';
// import { ListOfSitesComponent } from './list-of-sites/list-of-sites.component';
// import { ListOfFleetOwnerComponent } from './list-of-fleet-owner/list-of-fleet-owner.component';
// import { ListOfDriverComponent } from './list-of-driver/list-of-driver.component';
// import { ListOfCompaniesComponent } from './list-of-companies/list-of-companies.component';
// import { ListOfBookingDetailsFleetComponent } from './list-of-booking-details-fleet/list-of-booking-details-fleet.component';
// import { ListOfBookingDetailsComponent } from './list-of-booking-details/list-of-booking-details.component';
// import { ListOfBidToFleetOwnerComponent } from './list-of-bid-to-fleet-owner/list-of-bid-to-fleet-owner.component';
// import { ListOfBidByFleetComponent } from './list-of-bid-by-fleet/list-of-bid-by-fleet.component';
// import { CompanyUserManagementComponent } from './company-user-management/company-user-management.component';
// import { BillingSupplierComponent } from './billing-supplier/billing-supplier.component';
// import { BillingLatestComponent } from './billing-latest/billing-latest.component';
// import { BillingFleetComponent } from './billing-fleet/billing-fleet.component';
// import { BillingComponent } from './billing/billing.component';
// import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
// import { AddTruckTypeComponent } from './add-truck-type/add-truck-type.component';
// import { AddMaterialComponent } from './add-material/add-material.component';
// import { AddThermalPlantsComponent } from './add-thermal-plants/add-thermal-plants.component';
// import { UserRollManagementComponent } from './user-roll-management/user-roll-management.component';
// 

// import { NotificationListMgtComponent } from './notification-list-mgt/notification-list-mgt.component';
// import { OthersComponent } from './others/others.component';

// 
// import { AddCrushersComponent } from './add-crushers/add-crushers.component';
// import { SignupDataComponent } from './signup-data/signup-data.component';
// 


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'forgot_password', component: ForgotPasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // 
  // { path: 'signup_data', component: SignupDataComponent},
  // { path: 'add_crushers_and_mining_info', component: AddCrushersComponent},
  // { path: 'others', component: OthersComponent},
  // { path: 'add_thermal_plants', component: AddThermalPlantsComponent},
  // { path: 'notification_list_mgt', component: NotificationListMgtComponent},
  // { path: 'user_roll_management', component: UserRollManagementComponent},
  // { path: 'add_material', component: AddMaterialComponent},
  // { path: 'terms_and_conditions', component: TermsAndConditionsComponent},
  // { path: 'quotes_supplier', component: QuotesSupplierComponent},
  // { path: 'quotes', component: QuotesComponent},
  // { path: 'my_booking_supplier', component: MyBookingSupplierComponent},
  // { path: 'my_booking', component: MyBookingComponent},
  // { path: 'list_of_truck', component: ListOfTruckComponent},
  // { path: 'list_of_supplier', component: ListOfSupplierComponent},
  // { path: 'list_of_sites', component: ListOfSitesComponent },
  // { path: 'list_of_fleet_owner', component: ListOfFleetOwnerComponent},
  // { path: 'list_of_driver', component: ListOfDriverComponent},
  // { path: 'list_of_companies', component: ListOfCompaniesComponent},
  // { path: 'list_of_booking_details_fleet', component: ListOfBookingDetailsFleetComponent},
  // { path: 'list_of_booking_details', component: ListOfBookingDetailsComponent},
  // { path: 'list_of_bid_to_fleet_owner', component: ListOfBidToFleetOwnerComponent},
  // { path: 'list_of_bid_by_fleet', component: ListOfBidByFleetComponent},
  // { path: 'company_user_management', component: CompanyUserManagementComponent},
  // { path: 'billing_supplier', component: BillingSupplierComponent},
  // { path: 'billing_latest', component: BillingLatestComponent},
  // { path: 'billing_fleet', component: BillingFleetComponent},
  // { path: 'billing', component: BillingComponent},
  // { path: 'add_contact_us', component: AddContactUsComponent},
  // 

  { path: 'reset-password', component: ResetPasswordComponent },
  // { path: 'company_management', component: DashboardComponent },

  // 
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'fleet-management', component: UserManagementComponent },
  // { path: 'supplier_management', component: UserDetailsComponent },
  // { path: 'wallet-details/:id', component: WalletDetailsComponent },
  // { path: 'kyc-management', component: KycManagementComponent },
  // { path: 'wallet-management', component: UserDetailsComponent },
  // { path: 'deposite-wallet', component:DepositeWalletComponent},
  // { path: 'transaction-management', component: TransactionManagementComponent },
  // { path: 'view-transaction', component: ViewTransactionComponent },
  // { path: 'withdrawal-limit', component: WithdrawalLimitComponent },
  // { path: 'fee-management', component: FeeManagementComponent },
  // { path: 'manage-fee', component: ManageFeeComponent},
  // { path: 'standard-trading-fee', component: StandardTradingFeeComponent},
  // { path: 'min-withdrawl-amount', component: MinWithdrawlAmountComponent},
  // { path: 'update-withdrawl-amount', component: UpdateWithdrawlAmountComponent},
  // { path: 'min-trading-fee', component: MinTradingFeeComponent},
  // { path: 'profit-loss-management', component: ProfitLossManagementComponent },
  // { path: 'user-detail-trading',component : UserDetailTradingComponent},
  // { path: 'hot-cold-wallet-management', component: HotColdWalletManagementComponent },
  // { path: 'view-hot-cold-wallet-management',component:ViewHotColdWalletManagementComponent },
  // { path: 'hot-wallet-management', component:HotWalletManagementComponent},
  // { path: 'static-content-management', component: StaticContentManagementComponent },
  // { path: 'TermsAndCondition/:id', component: TermsAndConditionsComponent },
  // { path: 'PrivacyPolicy', component: PrivacyPolicyComponent },
  // { path: 'AboutUs/:id', component: AboutUsComponent },
  // { path: 'faq-management',component:FaqComponent},
  // { path: 'add-faq', component:AddFaqComponent},
  // { path: 'edit-faq', component:EditFaqComponent},
  // { path: 'announcement-management', component:AnnouncementComponent},
  // { path: 'add-announcement', component:AddAnnouncementComponent},
  // { path: 'edit-announcement', component:EditAnnouncementComponent},
  // { path: 'view-announcement', component:ViewAnnouncementComponent},
  // { path: 'content-management', component:ContentManagementComponent},

  // { path:'login-session-activity' ,component : LoginSessionActivityComponent},
  // { path:'view-user-trading-detail' ,component : ViewUserTradingDetailComponent},
  // { path: 'setting', component: SettingsComponent },
  // { path: 'taker-maker-fee', component: TakerMakeFeeComponent},
  // { path: 'view-limit', component: ViewLimitComponent },
  // { path: 'view-fee', component:ViewFeeComponent},
  // { path: 'withdrawl-fee', component: WithdrawlFeeComponent },
  // { path: 'withdrawl-limit', component: WithdrawlLimitComponent },

  // { path: 'add_truck_type', component: AddTruckTypeComponent },
  // { path: 'admin-detail', component: AdminDetailComponent },
  // { path: 'add-administator', component: AddAdministerComponent },
  // { path: 'kyc-detail', component: KycDetailComponent},
  // { path: 'kyc-update', component: KycUpdateComponent},

  // { path: 'manage-fee', component: ManageFeeComponent},
  // { path: 'standard-trading-fee', component: StandardTradingFeeComponent},
  // { path: 'min-trading-fee', component: MinTradingFeeComponent},

  // { path: 'my-profile', component: MyProfileComponent },
  // { path: 'edit-profile', component: EditProfileComponent },
  // { path: 'change-password', component:ChangePasswordComponent},
  // { path: 'token-management', component:TokenManagementComponent},
  // { path: 'add-token', component:AddTokenComponent},
  // { path: 'edit-token', component:EditTokenComponent},
  // { path: 'view-token', component:ViewTokenComponent},
  // { path: 'ticket-management', component:TicketManagementComponent},
  // { path: 'view-ticket', component:ViewTicketComponent},
  // { path: 'reply-ticket', component:ReplyTicketComponent},
  // { path: 'limit', component:WithdrawalLimitComponent},
  // { path: 'all-user-trader', component:AllUserTraderComponent},
  // { path: 'fiat', component:FiatComponent},
  // { path: 'send-money', component:SendMoneyComponent},
  // 

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
  // // company management-> company-user-management
  { path: 'list-of-company-user', component: ListOfCompanyUserComponent },
  // company management-> booking
  { path: 'list-of-company-booking', component: ListOfCompanyBookingComponent },
  // company management-> quotes
  { path: 'list-of-company-quote', component: ListOfCompanyQuoteComponent },
  // company management-> billing
  { path: 'list-of-company-billing', component: ListOfCompanyBillingComponent },

  { path: 'footer', component: FooterComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
