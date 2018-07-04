import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './components/articles/articles.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: ArticlesComponent}
    ])
  ],
  declarations: [ArticlesComponent]
})
export class ArticlesModule { }
