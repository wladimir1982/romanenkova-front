import {ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {INgxMyDpOptions, NgxMyDatePickerConfig, NgxMyDatePickerDirective, IMyInputFieldChanged, IMyDateModel} from 'ngx-mydatepicker';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as Moment from 'moment';
import {extendMoment} from 'moment-range';
import {MomentObjectOutput} from 'moment';

const moment = extendMoment(Moment);

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

  private isDisabled: boolean;
  private isCalendarOpen: boolean;
  public selectedDate: Moment.Moment = moment().startOf('day');
  public minDate: Moment.Moment = moment().startOf('day');
  private range = moment.rangeFromInterval('days', 600, this.minDate);
  public monthYearRange: Array<Moment.Moment>;
  public monthYearRangeIndex: number = 0;
  public weekdays = {
    mo: 'mo',
    tu: 'tu',
    we: 'we',
    th: 'th',
    fr: 'fr',
    st: 'st',
    su: 'su',
  };
  public value: any;
  public textValue: string;
  private onTouch: () => void;
  private onChange: (v: string) => void = () => {
  };

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
    this.monthYearRange = Array.from(this.range.by('month'));

    this.events$.pipe(
      filter((e: Event): boolean => e.type === 'click')
    )
      .subscribe((e: Event) => {
        // this.toggleCalendar(this.dp, false);
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

  public setMonth(direction: string): void {
    if ((this.monthYearRangeIndex === 0 && direction === 'prev') ||
      this.monthYearRangeIndex === (this.monthYearRange.length - 1) && direction === 'next') {
      return;
    }

    const addvalue = direction === 'next' ? 1 : -1;
    this.monthYearRangeIndex += addvalue;
  }

  public getDaysLine(): Array<Moment.Moment> {
    return Array.from(this.range.by('day'))
      .filter((d: Moment.Moment): boolean =>
        (d.month() === this.monthYearRange[this.monthYearRangeIndex].month()) &&
        (d.year() === this.monthYearRange[this.monthYearRangeIndex].year()));
  }

  setActiveDate(day: Moment.Moment) {
    this.selectedDate = day;
  }
}
