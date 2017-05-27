import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Language } from './language';
import { Section } from '../section/section';
import { Category } from '../category/category';
import { Word } from '../word/word';
import { LanguageService } from './language.service';
import { SectionService } from '../section/section.service';
import { CategoryService } from '../category/category.service';
import { WordService } from '../word/word.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageListComponent implements OnInit, OnChanges {
  languages: Language[];
  settingsIconPath: string;
  languageNotebook: Language;
  sections: Section[];
  categories: Category[];
  words: Word[];
  tabs: string[];
  tabSelected: string = '';
  sectionSelected: Section;
  selectedSection: Section;
  selectedCategory: Category;
  sectionsID: string;
  showAddLanguageModal: boolean;

  constructor(
    private languageService: LanguageService,
    private sectionService: SectionService,
    private categoryService: CategoryService,
    private wordService: WordService
  ) {
    this.tabs = ['Działy', 'Kategorie', 'Ulubione'];
    this.tabSelected = 'Działy';
    this.sectionsID = 'SECTION_COMPONENT_LIST';
    this.showAddLanguageModal = false;
  }

  ngOnInit() {
    this.getLanguages();
    this.getSettingsIcon();
  }

  ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
    EmitterService.get(this.sectionsID).subscribe((section:Section) => {
      this.getLanguageSections(this.languageNotebook)
    });
  }

  getSettingsIcon() {
   this.settingsIconPath = "../assets/images/settings.svg";
 }

  changeLanguage(language) {
    this.languageNotebook = language;
    this.getLanguageSections(this.languageNotebook);
    this.getLanguageCategories(this.languageNotebook);
    console.log(this.languageNotebook);
  }

  addNewLanguageModal() {
    this.showAddLanguageModal = true;
  }

  tabChanged (tab: string){
      this.tabSelected = tab;
  }

  log(val) { console.log(val); }

  getLanguages() {
    this.languageService.getLanguages()
      .subscribe(languages => {
        this.languages = languages;
        this.setDefaultLanguage(this.languages[0]);
        this.getLanguageSections(this.languageNotebook);
        this.getLanguageCategories(this.languageNotebook);
      });
  }

  setDefaultLanguage(language) {
    this.languageNotebook = language;
  }

  getLanguageSections(language) {
    this.sectionService.getSections(language.id)
      .subscribe(sections => {
        this.sections = sections;
      })
  }

  getLanguageCategories(language) {
    this.categoryService.getCategories(language.id)
      .subscribe(categories => {
        this.categories = categories;
      })
  }

  setSectionWords (event: Word[]) {
    this.words = event;
  }

  setCategoryWords(event: Word[]) {
    this.words = event;
  }

  setSelectedSection (event: Section) {
    this.selectedSection = event;
  }

  setSelectedCategory(event: Category) {
    this.selectedCategory = event;
  }

  reloadSections(event: Section) {
    this.getLanguageSections(this.languageNotebook);
  }

  reloadLanguages(event: Language) {
    this.languageService.getLanguages()
      .subscribe(languages => {
        this.languages = languages;
      });
  }

  getSectionWords(language, section) {
    this.wordService.getWords(language.id, section.id)
      .subscribe(words => {
        this.words = words;
      })
  }

  reloadSectionWords(event: Word) {
    this.getSectionWords(this.languageNotebook, this.selectedSection);
  }

}
