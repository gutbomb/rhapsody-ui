import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription = new Subscription;
  paramSubscription: Subscription = new Subscription;
  passwordCheckSubscription: Subscription = new Subscription;
  
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService
  ) { }

  public inputEmail: string = '';
  public inputPassword: string = '';
  public email: string = '';

  public error: string = '';
  public success: string = '';
  

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      if (params['userValidationString']) {
        this.loginService.validateUser(params['userValidationString']).subscribe(validation => {
          this.router.navigate(['admin/login']);
        }, error => {
          this.error = error.error.status;
        });
      }
    });
  };

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
    this.passwordCheckSubscription?.unsubscribe();
  }

  login(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.loginSubscription = this.loginService.loginUser(f.form.controls['inputEmail'].value, f.form.controls['inputPassword'].value).subscribe(() => {
        this.dataSharingService.isAdmin.next(true);
        this.passwordCheckSubscription = this.loginService.getUser(this.loginService.getUserId()).subscribe(response => {
          if (response.password_mustchange) {
            this.router.navigate(['admin/change-password']);
          } else {
            this.router.navigate(['home']);
          }
        })
        
      }, (error) => {
        this.error = error.error.status;
      });
    }
  }
}
