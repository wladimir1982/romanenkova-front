import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider/slider.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule
  ],
  declarations: [SliderComponent, InputComponent, TextareaComponent],
  exports: [SliderComponent, InputComponent, TextareaComponent]
})
export class ComponentsModule { }
