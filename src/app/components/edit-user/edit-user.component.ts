import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public isAdmin: any;
  public userSubscription: Subscription = new Subscription;
  public error: any;
  public user: any;
  public success: any;
  public displayModal: boolean = false;
  public id: any;
  public paramSubscription: Subscription = new Subscription;
  public resetSubscription: Subscription = new Subscription;
  public deleteSubscription: Subscription = new Subscription;
  public updateSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    } else {
      this.getUser();
    }
  };

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
    this.resetSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

  getUser() {
    this.userSubscription = this.loginService.getUser(this.id).subscribe(data => {
      this.user = data;
    }, error => {this.error=error.error.status;});
  }

  updateUser(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.updateSubscription = this.loginService.updateUser(this.user).subscribe(response => {
        this.success = 'User Updated Successfully';
      }, error => { this.error = error.error.status;});
    } else {
      console.log(f);
    }
  }

  resetPassword() {
    this.resetSubscription = this.loginService.resetPassword(this.user.user_email).subscribe(response => {
      this.success = 'Password Reset Sent Successfully';
    });
  }

  deleteUser() {
    this.deleteSubscription = this.loginService.deleteUser(this.id).subscribe(response => {
      this.success = 'User Deleted Successfully';
      this.router.navigate(['admin/users']);
    }, error => { this.error = error.error.status; });
  }
}
