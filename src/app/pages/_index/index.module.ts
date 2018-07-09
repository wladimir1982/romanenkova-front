import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import {RouterModule} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {AboutModule} from '../about/about.module';
import {ArticleModule} from '../article/article.module';
import {ArticlesModule} from '../articles/articles.module';
import {DiplomasModule} from '../diplomas/diplomas.module';
import {ServicesModule} from '../services/services.module';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AttendButtonComponent} from './components/attend-button/attend-button.component';

@NgModule({
  imports: [
    CommonModule,
    AboutModule,
    ArticleModule,
    ArticlesModule,
    DiplomasModule,
    ServicesModule,
    RouterModule.forChild([
      {
        path: 'about',
        loadChildren: './../about/about.module#AboutModule',
        outlet: 'contents'
      }, /*,
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
  declarations: [IndexComponent, MainComponent, FooterComponent, HeaderComponent, ContactsComponent, AttendButtonComponent],
  exports: []
})
export class IndexModule { }
