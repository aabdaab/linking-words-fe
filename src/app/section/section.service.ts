import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Section } from './section';

@Injectable()
export class SectionService {
  private languagesUrl = 'http://localhost:3000/api/languages/';

  constructor(private http: Http) {}

  getSections(language_id: number): Observable<Section []> {
    const languageSpecificSectionsUrl = this.languagesUrl + language_id + '/sections';
    return this.http.get(languageSpecificSectionsUrl)
      .map((response: Response) => <Section []>response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }

  addSection(language_id: number, section: Object): Observable<Section> {
    const languageSpecificSectionsUrl = this.languagesUrl + language_id + '/sections';
    let bodyString = JSON.stringify(section);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(languageSpecificSectionsUrl, bodyString, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error...'));
  }
}
