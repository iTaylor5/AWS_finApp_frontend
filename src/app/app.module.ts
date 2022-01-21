import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { TabsModule } from 'ngx-bootstrap/tabs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraphComponent } from './pages/graph/graph.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SubmitTransactionComponent } from './pages/submit-transaction/submit-transaction.component';
import { MembersComponent } from './pages/members/members.component';
import { SettingsComponent } from './pages/settings/component/settings.component';
import { CustomPaginationComponent } from './pagination/components/custom-pagination/custom-pagination.component';
import { EditCategoriesComponent } from './pages/categories/edit-categories/edit-categories.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { TagInputModule } from "ngx-chips";

import { ModalModule } from 'ngx-bootstrap/modal';

import { ModalComponent } from './pages/settings/component/modal/modal.component';
import { CategoryOverviewComponent } from './pages/categories/category-overview/category-overview.component';
import { EditSubcategoriesComponent } from './pages/categories/edit-subcategories/edit-subcategories.component';
import { EditAccountsComponent } from './pages/accounts/edit-accounts/edit-accounts.component';
import { AccountsOverviewComponent } from './pages/accounts/accounts-overview/accounts-overview.component';
import { MembersOverviewComponent } from './pages/settings/component/members-overview/members-overview.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { MemberEditComponent } from './pages/members/member-edit/member-edit.component';
import { OveralTransactionsComponent } from './pages/transactions/overal-transactions/overal-transactions.component';
import { ModalContentComponent } from './pages/transactions/modal-content/modal-content.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    GraphComponent,
    TransactionsComponent,
    SubmitTransactionComponent,
    MembersComponent,
    SettingsComponent,
    CustomPaginationComponent,
    EditCategoriesComponent,
    ModalComponent,
    CategoryOverviewComponent,
    EditSubcategoriesComponent,
    EditAccountsComponent,
    AccountsOverviewComponent,
    MembersOverviewComponent,
    CategoriesComponent,
    AccountsComponent,
    MemberEditComponent,
    OveralTransactionsComponent,
    ModalContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule,
    NgxPaginationModule,

    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    ModalModule.forRoot(),
    AlertModule,
    TagInputModule,

  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
  exports: [
    ModalModule
  ]
})
export class AppModule { }
