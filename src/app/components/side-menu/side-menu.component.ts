import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: '[side-menu]',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  constructor(
    private loginService: LoginService
  ) {}

  logout() {
    this.loginService.logoutUser();
  }
}
