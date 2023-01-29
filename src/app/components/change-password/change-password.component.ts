import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordSubscription: Subscription = new Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';
  public error: string = '';
  public success: string = '';

  ngOnInit() {
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    }
  };

  ngOnDestroy() {
    this.changePasswordSubscription?.unsubscribe();
  }

  changePassword(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.changePasswordSubscription = this.loginService.changePassword(f.form.controls['currentPassword'].value, f.form.controls['newPassword'].value).subscribe(result => {
        if (result) {
          this.success = 'Password changed successfully.';
        }
      }, error => {
        this.error = error.error.status;
      });
    }
  }

  clearError() {
    this.error = '';
  }
}
