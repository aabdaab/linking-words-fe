import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Category } from './category';
import { Language } from '../language/language';
import { Word } from '../word/word';
import { CategoryService } from './category.service';
import { WordService } from '../word/word.service';


@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  @Input() categories: Category[];
  @Input() language: Language;
  @Output() categoryWords: EventEmitter <Word[]> = new EventEmitter();
  @Output() categorySelected: EventEmitter <Category> = new EventEmitter();

  ngOnInit () {
  }

  constructor(
    private wordService: WordService
  ) {
   }

   getCategoryWords(language, category) {
     console.log(category);
     console.log(category.words);
    //  this.wordService.getCategoryWords(language.id, category.id)
    //    .subscribe(words => {
    //      this.categoryWords.emit(words);
    //      this.categorySelected.emit(category);
    //    })
    this.categoryWords.emit(category.words);
    this.categorySelected.emit(category);
   }

}
