import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { ContentComponent } from './components/content/content.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ColorwaysComponent } from './components/colorways/colorways.component';
import { LoginComponent } from './components/login/login.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { DataSharingService } from './services/data-sharing.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountComponent } from './components/account/account.component';
import { UsersComponent } from './components/users/users.component';
import { OrderByPipe } from './shared/orderByPipe';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ManageContentComponent } from './components/manage-content/manage-content.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ManageColorwaysComponent } from './components/manage-colorways/manage-colorways.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    ContentComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideMenuComponent,
    ColorwaysComponent,
    LoginComponent,
    AdminMenuComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AccountComponent,
    UsersComponent,
    OrderByPipe,
    AddUserComponent,
    EditUserComponent,
    ManageContentComponent,
    ManageColorwaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    DataSharingService
  ]
})
export class AppModule { }
