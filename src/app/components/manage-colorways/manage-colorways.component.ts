import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { ColorwaysService } from 'src/app/services/colorways.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-colorways',
  templateUrl: './manage-colorways.component.html',
  styleUrls: ['./manage-colorways.component.scss']
})
export class ManageColorwaysComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private appConfigService: AppconfigService,
    private colorwaysService: ColorwaysService
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public isAdmin: any;
  public baseurl = this.appConfigService.baseUrl();
  public colorways: any;
  public colorwaysSubscription: Subscription = new Subscription;
  public addColorwaySubscription: Subscription = new Subscription;
  public updateColorwaySubscription: Subscription = new Subscription;
  public deleteColorwaySubscription: Subscription = new Subscription;
  public colorwayCategorySubscription: Subscription = new Subscription;
  public updateColorwayCategorySubscription: Subscription = new Subscription;
  public deleteColorwayCategorySubscription: Subscription = new Subscription;
  public addColorwayImageSubscription: Subscription = new Subscription;
  public deleteColorwayImageSubscription: Subscription = new Subscription;
  public uploadSubscription: Subscription = new Subscription;
  public error: any;
  public success: any = false;
  public imagePath: string = `${this.baseurl}/colorway-image/`;
  public newColorway: any;
  public newColorwayName: any;
  public newColorwayCategory: any;
  public newCategoryName: any;
  public addCategory: any;
  public selectedCategory: any;
  public selectedColorway: any;
  public uploadFile: any;
  public uploadError: any;
  
  

  addColorway() {
    this.addColorwaySubscription = this.colorwaysService.addColorway(this.newColorwayName, this.newColorwayCategory).subscribe(response => {
      this.newColorwayName = '';
      this.newColorwayCategory = '';
      this.newColorway = false;
      this.getColorways();
      this.success = 'Colorway Added';
    }, error => { this.error=error.error.status;});
  }

  getColorways() {
    this.colorwaysService.getColorways().subscribe(colorways => {
      this.colorways = colorways;
    });
  };

  updateColorway(colorwayCategory: number, colorway: number) {
    this.updateColorwaySubscription = this.colorwaysService.updateColorway(this.colorways[colorwayCategory].colorways[colorway]).subscribe(response => {
      this.success = 'Colorway Updated';
      this.getColorways();
    }, error => {
      this.error=error.error.status;
    });
  };

  deleteColorway(colorwayId: number) {
    this.deleteColorwaySubscription = this.colorwaysService.deleteColorway(colorwayId).subscribe(response => {
      this.selectedColorway = false;
      this.getColorways();
      this.success = 'Colorway Deleted';
    }, error => {this.error=error.error.status;});
  };

  addColorwayCategory() {
    this.colorwayCategorySubscription = this.colorwaysService.addColorwayCategory(this.newCategoryName).subscribe(response => {
      this.getColorways();
      this.newCategoryName='';
      this.addCategory=false;
      this.success = 'Colorway Category Added';
    }, error => { this.error=error.error.status; });
  };

  updateColorwayCategory(colorwayCategory: number) {
    this.updateColorwayCategorySubscription = this.colorwaysService.updateColorwayCategory(this.colorways[colorwayCategory]).subscribe(response => {
      this.success = 'Colorway Category Updated';
      this.getColorways();
    }, error => { this.error=error.error.status; });
  };

  deleteColorwayCategory(colorwayCategoryId: number) {
    this.deleteColorwayCategorySubscription = this.colorwaysService.deleteColorwayCategory(colorwayCategoryId).subscribe(response => {
      this.selectedCategory = false;
      this.success = 'Colorway Category Deleted';
      this.getColorways();
    }, error => { this.error=error.error.status; });
  };

  addColorwayImage(colorwayImage: string, colorwayImageFilename: string) {
    this.addColorwayImageSubscription = this.colorwaysService.addColorwayImage(colorwayImage, colorwayImageFilename).subscribe(response => {
      this.success = 'Colorway image Added';
      this.getColorways();
    }, error => { this.error=error.error.status; });
  };

  deleteColorwayImage(colorwayImageId: number) {
    this.deleteColorwayImageSubscription = this.colorwaysService.deleteColorwayImage(colorwayImageId).subscribe(response => {
      this.success = 'Colorway image deleted';
      this.getColorways();
    }, error => { this.error=error.error.status; });
  };

  uploadImage(event: any, colorwayId: string) {
    const file:File = event.target.files[0];
    if(file) {
      this.doUpload(file, colorwayId);
    }
  };

  doUpload(file: File, colorwayId: string) {
    this.uploadSubscription = this.colorwaysService.uploadImage(file).subscribe({
      next: (event: any) => {
        if (event instanceof HttpResponse) {
          this.addColorwayImage(colorwayId, file.name);
          this.uploadFile = null;
        }
      }, error: (err: any) => {
        console.error(err);
        if (err.error & err.error.message) {
          this.uploadError = err.error.message;
        } else {
          this.uploadError = 'upload error';
        }
      }
    });
  }

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    } else {
      this.getColorways();
    }
  };

  ngOnDestroy(): void {
    this.colorwaysSubscription?.unsubscribe();
    this.addColorwaySubscription?.unsubscribe();
    this.updateColorwaySubscription?.unsubscribe();
    this.deleteColorwaySubscription?.unsubscribe();
    this.colorwayCategorySubscription?.unsubscribe();
    this.updateColorwayCategorySubscription?.unsubscribe();
    this.deleteColorwayCategorySubscription?.unsubscribe();
    this.addColorwayImageSubscription?.unsubscribe();
    this.deleteColorwayImageSubscription?.unsubscribe();
    this.uploadSubscription?.unsubscribe();
  }
}
