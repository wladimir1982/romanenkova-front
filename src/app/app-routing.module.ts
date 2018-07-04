import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: './pages/index/index.module#IndexModule'
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutModule'
  },
  {
    path: 'articles',
    loadChildren: './pages/articles/articles.module#ArticlesModule'
  },
  {
    path: 'services',
    loadChildren: './pages/services/services.module#ServicesModule'
  },
  {
    path: 'diplomas',
    loadChildren: './pages/diplomas/diplomas.module#DiplomasModule'
  },
  {
    path: 'article/:id',
    loadChildren: './pages/article/article.module#ArticleModule'
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
