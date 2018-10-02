import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;

  private isDisabled: boolean;
  private onChange: (v: string) => void = () => {};
  private onTouch: () => void;
  public value: string;

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
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
}
