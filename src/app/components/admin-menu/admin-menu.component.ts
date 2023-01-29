import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[admin-menu]',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataSharingService: DataSharingService) {
      this.dataSharingSubscription = this.dataSharingService.isAdmin.subscribe( value => {
        this.isAdmin = value;
      });
    }
  public isAdmin: any;
  public dataSharingSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
  }

  ngOnDestroy(): void {
    this.dataSharingSubscription?.unsubscribe();
  }

  logout() {
    this.loginService.logoutUser();
    this.isAdmin = false;
    this.dataSharingService.isAdmin.next(false);
    this.router.navigate(['home']);
  }
}