import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import {RouterModule} from "@angular/router";
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'about',
        loadChildren: './../about/about.module#AboutModule',
        outlet: 'contents'
      },/*,
      {
        path: 'articles',
        loadChildren: './../articles/articles.module#ArticlesModule'
      },
      {
        path: 'services',
        loadChildren: './../services/services.module#ServicesModule'
      },
      {
        path: 'diplomas',
        loadChildren: './../diplomas/diplomas.module#DiplomasModule'
      },
      {
        path: 'article/:id',
        loadChildren: './../article/article.module#ArticleModule'
      },
      { path: '',  pathMatch: 'full'},
      { path: '**', redirectTo: '/en', pathMatch: 'full'}*/
      {path: '**', component: MainComponent, outlet: 'contents'},
      // {path: '**', component: Page404Component}
    ])
  ],
  declarations: [IndexComponent, MainComponent],
  exports: [IndexComponent]
})
export class IndexModule { }
