import {ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {INgxMyDpOptions, NgxMyDatePickerConfig, NgxMyDatePickerDirective, IMyInputFieldChanged, IMyDateModel} from 'ngx-mydatepicker';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

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
export class DateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;
  @Input() events$: Observable<Event>;
  @ViewChild('dp') dp: NgxMyDatePickerDirective;

  private isDisabled: boolean;
  private isCalendarOpen: boolean;
  private currentDate: Date = new Date();
  public value: any;
  public dpOptions: INgxMyDpOptions = {
    dateFormat: 'dd mmm yyyy',
    disableUntil: {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate()},
    disableSince: {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 28},
    enableDates: [{year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate()}],
    disableWeekdays: ['su'],
    allowSelectionOnlyInCurrentMonth: false,
    showTodayBtn: false,
    showSelectorArrow: false
  };
  public textValue: string;
  private onTouch: () => void;
  private onChange: (v: string) => void = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public writeValue(value: any): void {
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

  public ngOnInit(): void {
    this.events$.pipe(
      filter((e: Event): boolean => e.type === 'click')
    )
      .subscribe((e: Event) => {
        this.toggleCalendar(this.dp, false);
      });
  }

  public input($event): void {
    this.textValue = $event.data;
  }

  public toggleCalendar(cal: NgxMyDatePickerDirective, state: boolean): void {
    if (state) {
      cal.openCalendar();
    } else {
      cal.closeCalendar();
    }

    this.isCalendarOpen = state;
    this.changeDetectorRef.markForCheck();
  }

  public stopPropagation($event: Event): void {
    $event.stopPropagation();
  }

  onBlur($event: FocusEvent) {
    console.log($event, this.value);
  }
}
