import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResolveHeaderService} from './pages/_index/services/resolve-header.service';
import {IndexComponent} from './pages/_index/components/index/index.component';
import {ResolveLanguageService} from './resolve-language.service';
import {LanguageGuardService} from './language-guard.service';

const routes: Routes = [
  {
    path: ':lang',
    loadChildren: './pages/_index/index.module#IndexModule',
    canActivate: [LanguageGuardService],
    resolve: {data: ResolveHeaderService, language: ResolveLanguageService},
    component: IndexComponent,
    outlet: 'primary'
  }, /*{
    path: ':lang/!**',
    loadChildren: './pages/_index/index.module#IndexModule',
    canActivate: [LanguageGuardService],
    resolve: {data: ResolveHeaderService, language: ResolveLanguageService},
    component: IndexComponent,
    outlet: 'primary'
  }, */{
    path: '404',
    loadChildren: './pages/_page404/page404.module#Page404Module',
    outlet: 'primary'
  },
  {path: '', component: IndexComponent, outlet: 'primary', canActivate: [LanguageGuardService]},
  {path: '**', redirectTo: '404', pathMatch: 'full', outlet: 'primary'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
