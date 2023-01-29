import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public isAdmin: any;
  public userSubscription: Subscription = new Subscription;
  public error: any;
  public user: any = {
    first_name: '',
    last_name: '',
    email: '',
    user_level: ''
  };
  public success: any;

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    }
  };

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  addUser(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.userSubscription = this.loginService.addUser(this.user).subscribe(() => {
        this.success = 'User Added Successfully';
        this.error = '';
        this.user.first_name = '';
        this.user.last_name = '';
        this.user.user_level = '';
        this.user.email = '';
        this.router.navigate(['/admin/users']);
      }, error => {
        this.error = error.error.status;
      });
    }
  }
}
