import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanguageListComponent } from './language/language-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: LanguageListComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
