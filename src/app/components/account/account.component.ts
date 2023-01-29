import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  updateSubscription: Subscription = new Subscription;
  profileSubscription: Subscription = new Subscription;
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public profile: any;
  public error: string = '';
  public success: string = '';
  public isAdmin: any;
  

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    } else {
      this.getProfile();
    }
  };

  ngOnDestroy() {
    this.updateSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
  }

  updateProfile(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.updateSubscription = this.loginService.updateProfile(this.profile).subscribe(update => {
        this.success = 'User Updated Successfully';
      }, error => {
        this.error = error.error.status;
      });
    }
  }

  getProfile() {
    this.profileSubscription = this.loginService.getUser(this.loginService.getUserId()).subscribe(profile => {
      this.profile = profile;
    }, error => {
      this.error = error.error.status;
    })
  }
}
