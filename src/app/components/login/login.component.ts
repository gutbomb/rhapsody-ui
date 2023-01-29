import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AppconfigService } from 'src/app/services/appconfig.service';
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
  
  constructor(
    private loginService: LoginService,
    private appConfigService: AppconfigService,
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
  }

  login(f: NgForm) {
    if (f.form.status === 'VALID') {
      this.loginSubscription = this.loginService.loginUser(f.form.controls['inputEmail'].value, f.form.controls['inputPassword'].value).subscribe(() => {
        this.dataSharingService.isAdmin.next(true);
        this.router.navigate(['home']);
      }, (error) => {
        this.error = error.error.status;
      });
    }
  }
}
