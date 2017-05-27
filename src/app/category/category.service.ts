import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from './category';

@Injectable()
export class CategoryService {
  private languagesUrl = 'http://localhost:3000/api/languages/';

  constructor(private http: Http) {}

  getCategories(language_id: number): Observable<Category []> {
    const languageSpecificCategoriesUrl = this.languagesUrl + language_id + '/categories';
    return this.http.get(languageSpecificCategoriesUrl)
      .map((response: Response) => <Category []>response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }
}
