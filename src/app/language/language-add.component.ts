import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Language } from './language';
import { LanguageService } from './language.service';

@Component({
  selector: 'language-add',
  templateUrl: './language-add.component.html',
})
export class LanguageAddComponent implements OnInit {
  @Input() language: Language;
  @Output() languageAdded: EventEmitter <Language> =
                              new EventEmitter();

constructor(private languageService: LanguageService) { }

  ngOnInit () {
  }

  private model = new Language();

  addLanguage() {
    let languageOperation: Observable<Language>;

    languageOperation = this.languageService.addLanguage(this.model);

    languageOperation.subscribe(
      language => {
        console.log(language);
        this.model = new Language();
        this.languageAdded.emit(language);
      },
      err => {
        console.log(err);
      })
  }

}
