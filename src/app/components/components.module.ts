import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider/slider.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import {FormsModule} from '@angular/forms';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { DateInputComponent } from './date-input/date-input.component';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    NgxMyDatePickerModule
  ],
  declarations: [SliderComponent, InputComponent, TextareaComponent, DateInputComponent],
  exports: [SliderComponent, InputComponent, TextareaComponent, DateInputComponent]
})
export class ComponentsModule { }
