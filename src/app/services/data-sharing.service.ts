import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
