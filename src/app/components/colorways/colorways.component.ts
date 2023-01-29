import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { ColorwaysService } from 'src/app/services/colorways.service';

@Component({
  selector: 'app-colorways',
  templateUrl: './colorways.component.html',
  styleUrls: ['./colorways.component.scss']
})
export class ColorwaysComponent implements OnInit, OnDestroy {
  constructor(
    private colorwaysService: ColorwaysService,
    private appConfigService: AppconfigService
  ) {}

  baseurl = this.appConfigService.baseUrl();

  public error: any;
  public success: any = false;
  public imagePath: string = `${this.baseurl}/colorway-image/`;
  public newColorwayName: any;
  public newColorwayCategory: any;
  public newCategoryName: any;
  public colorways: any;
  public colorwaysSubscription: Subscription = new Subscription;

  getColorways() {
    this.colorwaysService.getColorways().subscribe(colorways => {
      this.colorways = colorways;
    });
  };

  ngOnInit() {
    this.getColorways();
  };

  ngOnDestroy(): void {
    this.colorwaysSubscription?.unsubscribe();
  }
}
