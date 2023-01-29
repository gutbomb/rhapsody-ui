import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ColorwaysService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppconfigService
  ) { }

  baseurl = this.appConfigService.baseUrl();

  public addColorway(colorway: string, category: string) {
    return this.http.post(`${this.baseurl}/colorways`,{colorway_name: colorway, colorway_category_id: category});
  }

  public getColorways() {
    return this.http.get(`${this.baseurl}/colorways`)
  }

  public updateColorway(colorway: any) {
    console.log(colorway);
    return this.http.put(`${this.baseurl}/colorways`, colorway);
  }

  public deleteColorway(colorway_id: number) {
    return this.http.delete(`${this.baseurl}/colorways/${colorway_id}`);
  }

  public addColorwayCategory(colorwayCategory: string) {
    return this.http.post(`${this.baseurl}/colorway-categories`, { colorway_category_name: colorwayCategory });
  }

  public getColorwayCategories() {
    return this.http.get(`${this.baseurl}/colorway-categories`);
  }

  public updateColorwayCategory(colorwayCategory: any) {
    return this.http.put(`${this.baseurl}/colorway-categories`, colorwayCategory);
  }

  public deleteColorwayCategory(colorway_category_id: number) {
    return this.http.delete(`${this.baseurl}/colorway-categories/${colorway_category_id}`);
  }

  public addColorwayImage(colorwayImage: string, colorwayImageFilename: string) {
    return this.http.post(`${this.baseurl}/colorway-image`, { colorway_id: colorwayImage, colorway_image_filename: colorwayImageFilename });
  }

  public deleteColorwayImage(colorway_image_id: number) {
    return this.http.delete(`${this.baseurl}/colorway-image/${colorway_image_id}`);
  }

  public uploadImage(file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/upload-colorway-image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
