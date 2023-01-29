import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { AppconfigService } from './appconfig.service';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isFormRecord } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppconfigService
  ) { }

  baseurl = this.appConfigService.baseUrl();
  tokenName = this.appConfigService.tokenName();
  activeUser = {};

  public loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseurl}/auth`, {username: username, password: password}).pipe(map(res => {
      let tokenObj: any = res;
      this.activeUser = this.parseToken(tokenObj.token);
      this.saveToken(tokenObj.token);
      return res;
    }), (error) => {return error});
  }

  public clearToken() {
    return localStorage.clear();
  }

  public getToken() {
    return localStorage[this.tokenName];
  }

  public isAuthenticated() {
    let token = this.getToken();

    return !!token;
  }

  public isAdmin() {
    if (this.isAuthenticated()) {
      let user = JSON.parse(this.parseToken(this.getToken()));
      return user.userLevel === 'admin';
    } else {
      return false;
    }
  }

  public getUser(user_id: string) {
    return this.http.get<User>(`${this.baseurl}/user/${user_id}`);
  }

  public getUsers() {
    return this.http.get(`${this.baseurl}/user/`);
  }

  public parseToken(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return Buffer.from(base64, 'base64').toString('binary');
  }

  public getUserId() {
    let token: any = JSON.parse(this.parseToken(this.getToken()));
    return token.id;
  }

  public saveToken(token: string) {
    localStorage[this.tokenName] = token;
  }

  public getActiveUser() {
    return this.activeUser;
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${this.baseurl}/change-password`, {oldPassword: oldPassword, newPassword: newPassword});
  }

  public resetPassword(email: string) {
    return this.http.get(`${this.baseurl}/reset-password/${email}`);
  }

  public logoutUser() {
    this.clearToken();
  }

  public updateProfile(user: any) {
    return this.http.put(`${this.baseurl}/profile`, user);
  }

  public updateUser(user: any) {
    return this.http.put(`${this.baseurl}/user/${user.user_id}`, {user_first_name: user.user_first_name, user_last_name: user.user_last_name, user_level: user.user_level, user_email: user.user_email});
  }

  public addUser(user: any) {
    return this.http.post(`${this.baseurl}/user`, {user_first_name: user.first_name, user_last_name: user.last_name, user_level: user.user_level, email: user.email});
  }

  public signUpUser(user: any) {
    return this.http.post(`${this.baseurl}/sign-up`, {user_first_name: user.firstName, user_last_name: user.lastName, user_password: user.password, email: user.email});
  }

  public deleteUser(userId: string) {
    return this.http.delete(`${this.baseurl}/user/${userId}`);
  }

  public validateUser(userValidationString: string) {
    return this.http.get(`${this.baseurl}/validate/${userValidationString}`);
  }
}
