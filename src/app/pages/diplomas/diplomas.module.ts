import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomasComponent } from './components/diplomas/diplomas.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: DiplomasComponent}
    ])
  ],
  declarations: [DiplomasComponent]
})
export class DiplomasModule { }
