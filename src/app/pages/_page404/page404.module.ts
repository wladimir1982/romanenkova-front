import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Page404Component} from './components/page404.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: Page404Component}
    ])
  ],
  declarations: [Page404Component]
})
export class Page404Module { }
