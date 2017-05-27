import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Word } from './word';
import { Section } from '../section/section';
import { Language } from '../language/language';
import { Category } from '../category/category';
import { Translation } from '../translation/translation';
import { TranslationService } from '../translation/translation.service';
import { WordService } from './word.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'word-show',
  templateUrl: './word-show.component.html',
})
export class WordShowComponent implements OnInit {
  @Input() language: Language;
  @Input() section: Section;
  @Input() category: Category;
  @Input() word: Word;
  openFormFlag: boolean;
  translations: Translation[];

constructor(private translationService: TranslationService) {
  this.openFormFlag = false;
}

  ngOnInit () {
    this.getTranslations();
  }

  private model = new Translation();

  toggleTranslationForm() {
    this.openFormFlag = !this.openFormFlag;
  }

  addTranslations() {
    let languageId = this.language.id;
    let sectionId = this.section.id;
    let wordId = this.word.id;

    let translationOperation: Observable<Translation>;

    translationOperation = this.translationService.addTranslation(languageId, sectionId, wordId, this.model);

    translationOperation.subscribe(translation => {
      console.log(translation);
    });
  }

  getTranslations() {
    let sectionId;
    if(!this.section && this.category) {
      sectionId = this.word.section_id;
    } else {
      sectionId = this.section.id;
    }
    this.translationService.getTranslations(this.language.id, sectionId, this.word.id)
      .subscribe(translations => {
        this.translations = translations;
      })
  }

}
