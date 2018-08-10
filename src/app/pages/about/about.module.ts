import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {ComponentsModule} from "../../conponents/components.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
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
