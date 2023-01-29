import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
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
  public usersSubscription: Subscription = new Subscription;
  public error: any;
  public users: any = {
    sort: {
      column: 'user_last_name',
      descending: false
    }
  }

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    } else {
      this.getUsers();
    }
  };

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

  getUsers() {
    this.usersSubscription = this.loginService.getUsers().subscribe(data => {
      this.users.data = data;
    }, error => { this.error=error.error.status;
    });
  }

  selectedCls(module: any, column: string) {
    return column === module.sort.column && 'sort-' + module.sort.descending;
  }

  changeSorting(module: any, column: string) {
    if (module.sort.column === column) {
      module.sort.descending = !module.sort.descending;
    } else {
      module.sort.column = column;
      module.sort.descending = false;
    }
  }
}
