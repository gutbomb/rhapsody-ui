import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnDestroy {
  public isAdmin: any;
  public listener: any;

  constructor(
    private loginService: LoginService,
    private renderer: Renderer2,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public menuOpen: any = false;
  public adminMenuOpen: any = false;

  public userSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
  }

  toggleMenu() {
    if (this.menuOpen) {
      this.renderer.removeClass(document.body, 'is-menu-visible');
      this.menuOpen = false;
    } else {
      this.renderer.addClass(document.body, 'is-menu-visible');
      this.menuOpen = true;
      setTimeout (() => {
        this.listener = this.renderer.listen('window', 'mouseup',(e:Event)=>{
          this.renderer.removeClass(document.body, 'is-menu-visible');
          this.menuOpen = false;
        });
      }, 500)
    } 
  }

  toggleAdminMenu() {
    if (this.adminMenuOpen) {
      this.renderer.removeClass(document.body, 'is-admin-visible');
      this.adminMenuOpen = false;
    } else {
      this.renderer.addClass(document.body, 'is-admin-visible');
      this.adminMenuOpen = true;
      setTimeout (() => {
        this.listener = this.renderer.listen('window', 'mouseup',(e:Event)=>{
          this.renderer.removeClass(document.body, 'is-admin-visible');
          this.adminMenuOpen = false;
        });
      }, 500)
    } 
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.loginService.logoutUser();
  }
}
