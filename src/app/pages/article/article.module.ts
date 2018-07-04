import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: ArticleComponent}
    ])
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
