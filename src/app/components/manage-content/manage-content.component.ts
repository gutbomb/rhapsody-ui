import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ContentService } from 'src/app/services/content.service';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-manage-content',
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.scss']
})
export class ManageContentComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private contentService: ContentService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private appConfigService: AppconfigService,
    private ckEditor: CKEditorModule
  ) {
    this.dataSharingService.isAdmin.subscribe( value => {
      this.isAdmin = value;
    });
  }

  public Editor = ClassicEditor;
  public isAdmin: any;
  public articlesSubscription: Subscription = new Subscription;
  public articleSubscription: Subscription = new Subscription;
  public updateSubscription: Subscription = new Subscription;
  public uploadSubscription: Subscription = new Subscription;
  public articles: any;
  public error: any;
  public success: any;
  public article: any = {
    article_author: -1,
    article_content: '',
    article_date: '',
    article_id: -1,
    article_image_class: '',
    article_image_filename: '',
    article_subtitle: '',
    article_tab: '',
    article_title: '',
    user_first_name: '',
    user_last_name: ''
  };
  public imageUrl: any;
  public baseurl: any = this.appConfigService.baseUrl();
  public imagePath: string = `${this.baseurl}/article-image/`;
  public selectedArticle: any = 'home';
  public uploadFile: any;
  public progress: any;
  public uploadMessage: any;
  public uploadError: any;

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
    if(!this.loginService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
    } else if (!this.isAdmin) {
      this.router.navigate(['home']);
    } else {
      this.getArticles();
      this.getArticle(this.selectedArticle);
    }
  };

  ngOnDestroy(): void {
    this.articlesSubscription.unsubscribe();
    this.articleSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
    this.uploadSubscription.unsubscribe();
  }

  getArticle(tab: string) {
    this.success = false;
    this.articleSubscription = this.contentService.getArticle(tab).subscribe(article => {
      this.success = '';
      this.error = '';
      this.article = article;
      console.log(this.article);
      if(this.article.article_image_filename) {
        this.imageUrl = `${this.imagePath}${this.article.article_image_filename}`;
      }
    }, error => {this.error = error.error.status});
  }

  getArticles() {
    this.articlesSubscription = this.contentService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  removeImage() {
    this.article.article_image_filename = null;
    this.article.article_image_class = null;
  }

  uploadImage(event: any) {
    const file:File = event.target.files[0];
    if(file) {
      this.doUpload(file);
    }
  }

  doUpload(file: File) {
    this.uploadSubscription = this.contentService.uploadImage(file).subscribe({
      next: (event: any) => {
        if (event instanceof HttpResponse) {
          this.article.article_image_filename = file.name;
          if (!this.article.article_image_class) {
           this.article.article_image_class = 'article-image-left'
          }
          this.imageUrl = `${this.imagePath}${file.name}`;
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

  updateArticle() {
    this.updateSubscription = this.contentService.updateArticle(this.article).subscribe(response => {
      this.success = 'Article updated successfully';
      this.getArticles();
    }, error => {
      this.success = '';
      this.error = error.error.status;
    })
  }
}
