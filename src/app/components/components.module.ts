import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider/slider.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { InputComponent } from './input/input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DateComponent } from './date/date.component';
import { TimeComponent } from './time/time.component';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  declarations: [SliderComponent, InputComponent, CheckboxComponent, SelectComponent, TextareaComponent, DateComponent, TimeComponent],
  exports: [SliderComponent, InputComponent, CheckboxComponent, SelectComponent, TextareaComponent, DateComponent, TimeComponent]
})
export class ComponentsModule { }
