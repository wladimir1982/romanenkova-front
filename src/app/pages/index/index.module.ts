import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: IndexComponent}
    ])
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
