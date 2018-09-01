import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {INgxMyDpOptions, NgxMyDatePickerConfig, NgxMyDatePickerDirective} from "ngx-mydatepicker";
import {InputComponent} from "../input/input.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateInputComponent),
  multi: true
};

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, NgxMyDatePickerConfig]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;

  private isDisabled: boolean;
  private onChange: (v: string) => void = () => {};
  private onTouch: () => void;
  public value: any;
  public dpOptions: INgxMyDpOptions;
  public textValue: string;
  private isCalendarOpen: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  input($event) {
    this.textValue = $event.data;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(state: boolean): void {
    this.isDisabled = state;
  }

  public toggleCalendar(cal: NgxMyDatePickerDirective, state: boolean) {
    if (state) {
      cal.openCalendar();
    } else {
      cal.closeCalendar();
    }

    this.isCalendarOpen = state;
    console.log(cal);
    this.changeDetectorRef.markForCheck();
  }

  khui() {
    console.log('pz');
    this.changeDetectorRef.markForCheck();

  }
}
