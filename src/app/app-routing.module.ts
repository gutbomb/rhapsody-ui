import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ColorwaysComponent } from './components/colorways/colorways.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountComponent } from './components/account/account.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ManageContentComponent } from './components/manage-content/manage-content.component';
import { ManageColorwaysComponent } from './components/manage-colorways/manage-colorways.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ContentComponent},
  { path: 'colorways', component: ColorwaysComponent},
  { path: 'wholesale', component: ContentComponent},
  { path: 'custom', component: ContentComponent},
  { path: 'classes', component: ContentComponent},
  { path: 'rabbitry', component: ContentComponent},
  { path: 'shop', component: ContentComponent},
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/reset-password', component: ResetPasswordComponent},
  { path: 'admin/change-password', component: ChangePasswordComponent},
  { path: 'admin/account', component: AccountComponent},
  { path: 'admin/login/:userValidationString', component: LoginComponent},
  { path: 'admin/users', component: UsersComponent},
  { path: 'admin/add-user', component: AddUserComponent },
  { path: 'admin/edit-user/:id', component: EditUserComponent },
  { path: 'admin/manage-content', component: ManageContentComponent },
  { path: 'admin/colorways', component: ManageColorwaysComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
