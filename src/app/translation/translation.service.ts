import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Translation } from './translation';

@Injectable()
export class TranslationService {
  private languagesUrl = 'http://localhost:3000/api/languages/';

  constructor(private http: Http) {}

  getTranslations(language_id: number, section_id: number, word_id: number): Observable<Translation []> {
    const wordTranslationsUrl = this.languagesUrl + language_id + '/sections/' + section_id + '/words/' + word_id + '/translations';
    return this.http.get(wordTranslationsUrl)
      .map((response: Response) => <Translation []>response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }

  addTranslation(language_id: number, section_id: number, word_id: number, translation: Object): Observable<Translation> {
    const wordTranslationsUrl = this.languagesUrl + language_id + '/sections/' + section_id + '/words/' + word_id + '/translations';
    let bodyString = JSON.stringify(translation);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(wordTranslationsUrl, bodyString, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }
}
