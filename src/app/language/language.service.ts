import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Language } from './language';

@Injectable()
export class LanguageService {
  private languagesUrl = 'http://localhost:3000/api/languages';

  constructor(private http: Http) {}

  getLanguages(): Observable<Language []> {
    return this.http.get(this.languagesUrl)
      .map((response: Response) => <Language []>response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }

  addLanguage(language: Object): Observable<Language> {
    let bodyString = JSON.stringify(language);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.languagesUrl, bodyString, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }
}
