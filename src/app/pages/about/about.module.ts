import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {ResolvePageService} from '../_index/services/resolve-page.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent
      }
    ])
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
}
