import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Word } from './word';
import { Language } from '../language/language';
import { Translation } from '../translation/translation';
import { Section } from '../section/section';
import { Category } from '../category/category';
import { WordService } from './word.service';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  @Input() words: Word[];
  @Input() language: Language;
  @Input() section: Section;
  @Input() category: Category;
  @Output() newWordAdded: EventEmitter <Section> = new EventEmitter();
  openFormFlag: boolean;

  constructor() {
      this.openFormFlag = false;
   }

  ngOnInit () {
  }

  openNewWordForm() {
    this.openFormFlag = !this.openFormFlag;
  }

  closeAddWordForm(event: Word) {
    this.openFormFlag = !this.openFormFlag;
    this.newWordAdded.emit(event);
  }
}
