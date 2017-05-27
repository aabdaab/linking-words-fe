import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Word } from './word';

@Injectable()
export class WordService {
  private languagesUrl = 'http://localhost:3000/api/languages/';

  constructor(private http: Http) {}

  getWords(language_id: number, section_id: number): Observable<Word []> {
    const sectionSpecificWordsUrl = this.languagesUrl + language_id + '/sections/' + section_id + '/words';
    return this.http.get(sectionSpecificWordsUrl)
      .map((response: Response) => <Word []>response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }

  // getCategoryWords(language_id: number, category_id: number): Observable<Word []> {
  //   const categorySpecificWordsUrl = this.languagesUrl + language_id + '/categories/' + category_id + '/words';
  //   return this.http.get(categorySpecificWordsUrl)
  //     .map((response: Response) => <Word []>response.json())
  //     .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  // }

  addWord(language_id: number, section_id: number, word: Object): Observable<Word> {
    const languageSpecificSectionsUrl = this.languagesUrl + language_id + '/sections/' + section_id + '/words';
    let bodyString = JSON.stringify(word);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(languageSpecificSectionsUrl, bodyString, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }
}
