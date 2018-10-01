import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './components/index/index.component';
import {RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AttendButtonComponent} from './components/attend-button/attend-button.component';
import {ResolvePageService} from './services/resolve-page.service';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { SocialComponent } from './components/header/social/social.component';
import { LanguageSelectorComponent } from './components/header/language-selector/language-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import {ComponentsModule} from '../../components/components.module';
import {NgxCaptchaModule} from 'ngx-captcha';
import {InterceptorService} from './services/interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { OverviewAboutComponent } from './components/overview-about/overview-about.component';
import {ResolveMainPageService} from './services/resolve-main-page.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'about',
        loadChildren: './../about/about.module#AboutModule',
        data: {pageid: 'about'},
        resolve: {pageData: ResolvePageService}
      },
      {
        path: 'articles',
        loadChildren: './../articles/articles.module#ArticlesModule',
        data: {pageid: 'article'},
        resolve: {pageData: ResolvePageService}
      },
      {
        path: 'services',
        loadChildren: './../services/services.module#ServicesModule',
        data: {pageid: 'service'},
        resolve: {pageData: ResolvePageService}
      },
      {
        path: 'diplomas',
        loadChildren: './../diplomas/diplomas.module#DiplomasModule',
        data: {pageid: 'diploma'},
        resolve: {pageData: ResolvePageService}
      },
      {
        path: 'article/:id',
        loadChildren: './../article/article.module#ArticleModule',
        data: {pageid: 'article'},
        resolve: {pageData: ResolvePageService}
      },
      {
        path: '',
        component: MainComponent,
        data: {pageid: 'main'},
        resolve: {pageData: ResolvePageService, pageBlocks: ResolveMainPageService}
      },
    ]),
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6Lc2zmsUAAAAAA0vgv4qoXcREi9LkfWwn1i0Jyil'
    }),
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    ContactsComponent,
    AttendButtonComponent,
    NavigationComponent,
    SocialComponent,
    LanguageSelectorComponent,
    ModalComponent,
    OverviewAboutComponent,
    SafeHtmlPipe
  ],
  exports: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]
})
export class IndexModule {
}
