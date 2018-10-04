import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;
  @Input() list: Array<any>;
  @Input() listDisplayProperty: string;

  public isDisabled: boolean;
  public value: string;
  private onTouch: () => void;
  private onChange: (v: string) => void = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

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
    this.changeDetectorRef.markForCheck();
  }
}
