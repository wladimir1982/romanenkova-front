import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider/slider.component';
import {SwiperModule} from 'ngx-swiper-wrapper';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  declarations: [SliderComponent],
  exports: [SliderComponent]
})
export class ComponentsModule { }
