import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Word } from '../word/word';
import { Section } from './section';
import { Language } from '../language/language';
import { SectionService } from './section.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'section-add',
  templateUrl: './section-add.component.html',
})
export class SectionAddComponent implements OnInit {
  @Input() language: Language;
  @Input() sectionsID: string;
  @Output() closeForm: EventEmitter <Section> =
                              new EventEmitter();

constructor(private sectionService: SectionService) { }

  ngOnInit () {
  }

  private model = new Section();

  addSection() {
    let sectionOperation: Observable<Section>;

    sectionOperation = this.sectionService.addSection(this.language.id, this.model);

    sectionOperation.subscribe(
      section => {
        console.log(section);
        this.model = new Section();
        this.closeForm.emit(section);
        // EmitterService.get(this.sectionsID).emit(section);
      },
      err => {
        console.log(err);
      })
  }

}
