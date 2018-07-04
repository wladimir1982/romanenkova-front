import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './components/services/services.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: ServicesComponent}
    ])
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
