import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Word } from '../word/word';
import { Section } from './section';
import { Language } from '../language/language';
import { SectionService } from './section.service';
import { WordService } from '../word/word.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'section-list',
  templateUrl: './section-list.component.html',
})
export class SectionListComponent implements OnInit {
  @Input() sections: Section[];
  @Input() language: Language;
  @Output() sectionWords: EventEmitter <Word[]> = new EventEmitter();
  @Output() sectionSelected: EventEmitter <Section> = new EventEmitter();
  @Output() newSectionAdded: EventEmitter <Section> = new EventEmitter();

  openFormFlag: boolean;
  sectionsID: string;

constructor(
  private wordService: WordService
) {
    this.openFormFlag = false;
    this.sectionsID = 'SECTION_COMPONENT_LIST';
 }

  ngOnInit () {
  }

  getSectionWords(language, section) {
    this.wordService.getWords(language.id, section.id)
      .subscribe(words => {
        this.sectionWords.emit(words);
        this.sectionSelected.emit(section);
      })
  }

  openNewSectionForm() {
    this.openFormFlag = !this.openFormFlag;
  }

  closeAdditionForm(event: Section) {
    this.openFormFlag = !this.openFormFlag;
    this.newSectionAdded.emit(event);
  }

}
