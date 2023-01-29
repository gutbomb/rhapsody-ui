import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {
  constructor(
    private contentService: ContentService,
    private appConfigService: AppconfigService,
    private route: ActivatedRoute,
  ) {}

  baseurl = this.appConfigService.baseUrl();

  public error: any;
  public successMessage: any;
  public selectedArticle: string = 'home';
  public imagePath: string = `${this.baseurl}/article-image/`;
  public article: any;
  public imageUpload: any;
  public uploadFile: any;
  public ckeditorConfig: any;
  public articles: any;
  public imageUrl: any;
  public articleSubscription: Subscription = new Subscription;
  public articlesSubscription: Subscription = new Subscription;
  public paramSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.paramSubscription = this.route.url.subscribe(url => {
      this.selectedArticle = url[0].path;
      if(this.selectedArticle!=='admin') {
        this.getArticle(this.selectedArticle);
      } else {
        this.getArticle(this.selectedArticle);
      }
    });
  };

  ngOnDestroy(): void {
    this.articleSubscription?.unsubscribe();
    this.articlesSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
  }

  getArticle(tab: string) {
    this.successMessage = false;
    this.articleSubscription = this.contentService.getArticle(tab).subscribe(article => {
      this.article = article;
      if(this.article.article_image_filename) {
        this.imageUrl = `${this.imagePath}${this.article.article_image_filename}`;
      }
    });
  }
}
