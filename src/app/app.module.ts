import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LanguageListComponent } from './language/language-list.component';
import { LanguageAddComponent } from './language/language-add.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionAddComponent } from './section/section-add.component';
import { CategoryListComponent } from './category/category-list.component';
import { WordListComponent } from './word/word-list.component';
import { WordAddComponent } from './word/word-add.component';
import { WordShowComponent } from './word/word-show.component';

import { LanguageService } from './language/language.service';
import { SectionService } from './section/section.service';
import { CategoryService } from './category/category.service';
import { WordService } from './word/word.service';
import { TranslationService } from './translation/translation.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LanguageListComponent,
    LanguageAddComponent,
    SectionListComponent,
    SectionAddComponent,
    CategoryListComponent,
    WordListComponent,
    WordAddComponent,
    WordShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LanguageService,
    SectionService,
    CategoryService,
    WordService,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
