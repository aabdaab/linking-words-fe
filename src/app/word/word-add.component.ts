import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Word } from './word';
import { Section } from '../section/section';
import { Language } from '../language/language';
import { WordService } from './word.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'word-add',
  templateUrl: './word-add.component.html',
})
export class WordAddComponent implements OnInit {
  @Input() language: Language;
  @Input() section: Section;
  @Output() closeForm: EventEmitter <Section> =
                              new EventEmitter();

constructor(private wordService: WordService) { }

  ngOnInit () {
  }

  private model = new Word();

  addWord() {
    let wordOperation: Observable<Section>;

    wordOperation = this.wordService.addWord(this.language.id, this.section.id, this.model);

    wordOperation.subscribe(
      word => {
        console.log(word);
        this.model = new Word();
        this.closeForm.emit(word);
      },
      err => {
        console.log(err);
      })
  }

}
