import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
};

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() type: string;

  public value: string;
  public rows: number;
  private onTouch: () => void;
  private isDisabled: boolean;
  private onChange: (v: string) => void = () => {};


  public writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.rows = value && value.split(/\r\n|\r|\n/).length;
    if (value) {
      this.rows = value.split(/\r\n|\r|\n/).length;
    } else {
      this.rows = 1;
    }
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

  constructor() {
  }

  public ngOnInit(): void {
  }
}
