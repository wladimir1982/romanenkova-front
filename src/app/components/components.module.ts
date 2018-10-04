import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider/slider.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import {FormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng4-click-outside';
import { DateInputComponent } from './date-input/date-input.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    ClickOutsideModule
  ],
  declarations: [SliderComponent, InputComponent, TextareaComponent, DateInputComponent, SelectComponent],
  exports: [SliderComponent, InputComponent, TextareaComponent, DateInputComponent, SelectComponent]
})
export class ComponentsModule { }
