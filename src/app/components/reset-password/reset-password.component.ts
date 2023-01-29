import { Component, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnDestroy {
  constructor(
    private loginService: LoginService,
    private appConfigService: AppconfigService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) { }

  public inputEmail: string = '';
  public error: string = '';
  public success: string = '';
  public resetSubscription: Subscription = new Subscription;

  ngOnDestroy() {
    this.resetSubscription?.unsubscribe();
  }

  resetPassword(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.resetSubscription = this.loginService.resetPassword(f.form.controls['inputEmail'].value).subscribe(response => {
        this.success='Password Reset Email Sent';
      }, error => {this.error = error.error.status})
    }
  }
}
