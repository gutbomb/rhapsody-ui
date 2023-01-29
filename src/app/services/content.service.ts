import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppconfigService
  ) { }

  baseurl = this.appConfigService.baseUrl();
  tokenName = this.appConfigService.tokenName();

  public getArticle(tab: string) {
    return this.http.get(`${this.baseurl}/articles/${tab}`);
  }

  public getArticles() {
    return this.http.get(`${this.baseurl}/articles/`);
  }

  public updateArticle(article: any) {
    return this.http.put(`${this.baseurl}/articles/${article.article_tab}`, article);
  }

  public uploadImage(file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/article-image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
