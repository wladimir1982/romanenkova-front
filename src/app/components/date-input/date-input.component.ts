import {ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as Moment from 'moment';
import {DateRange, extendMoment} from 'moment-range';
import {LanguageGuardService} from '../../language-guard.service';
import {invalid} from 'moment';

const moment = extendMoment(Moment);

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateInputComponent),
  multi: true
};

export interface IWeekdays {
  mo: string;
  tu: string;
  we: string;
  th: string;
  fr: string;
  sa: string;
  su: string;
}

export interface IMonths {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
}

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;
  @Input() events$: Observable<Event>;
  @ViewChild('dateInput') dateInput: ElementRef;

  public weekdays: Array<string>;
  private isDisabled: boolean;
  public isCalendarOpen: boolean;
  public selectedDate: Moment.Moment;
  public minDate: Moment.Moment;
  private range: DateRange;
  public monthYearRange: Array<Moment.Moment>;
  public monthYearRangeIndex: number = 0;
  public value: string;
  public textValue: string;
  private shouldParseDate: boolean = true;
  public parsedDate: string;
  private onTouch: () => void;
  private onChange: (v: string) => void = (v: string) => { };

  constructor(private changeDetectorRef: ChangeDetectorRef, private languageService: LanguageGuardService) {
  }

  public writeValue(value: string): void {
    this.value = value;
    if (!value) {
      this.onChange(value);
    }
    if (this.shouldParseDate) {
      const parsedDate = moment(value, ['DD.MM.YYYY', 'DD,MM,YYYY', 'DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD.MM', 'DD,MM', 'DD-MM', 'MM/DD', 'MM-DD']).startOf('day');
      if (!parsedDate.isValid() || !parsedDate.within(this.range)) {
        this.parsedDate = '';
        this.onChange('');
        return;
      }
      this.selectedDate = parsedDate;
    }
    this.parsedDate = `(${this.selectedDate.format('DD MMMM YYYY')})`;
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
    // todo: bring to i18nService
    Moment.locale(this.languageService.selectedLang);
    const weekdays = Moment.weekdays();
    const weekdaysMin = Moment.weekdaysMin();
    const weekdaysShort = Moment.weekdaysShort();
    weekdays.push(weekdays.shift());
    weekdaysMin.push(weekdaysMin.shift());
    weekdaysShort.push(weekdaysShort.shift());
    Moment.updateLocale(this.languageService.selectedLang, {
      weekdays,
      weekdaysShort,
      weekdaysMin,
      week: {
        dow: 1,
        doy: 1
      }
    });
    this.selectedDate = moment().startOf('day');
    this.minDate = moment().startOf('day');
    this.range = moment.rangeFromInterval('days', 28, this.minDate);
    this.monthYearRange = Array.from(this.range.by('month'));
    this.weekdays = Moment.weekdaysMin();

    this.events$.pipe(
      filter((e: Event): boolean => e.type === 'click')
    )
      .subscribe((e: Event) => {
        this.toggleCalendar(false);
      });
  }

  public input($event): void {
    this.textValue = $event.data;
  }

  public toggleCalendar(state: boolean): void {
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

    this.monthYearRangeIndex += direction === 'next' ? 1 : -1;
  }

  public getDays(): Array<Moment.Moment> {
    return Array.from(this.range.by('day'))
      .filter((d: Moment.Moment): boolean =>
        (d.month() === this.monthYearRange[this.monthYearRangeIndex].month()) &&
        (d.year() === this.monthYearRange[this.monthYearRangeIndex].year()));
  }

  public setActiveDate(day: Moment.Moment): void {
    this.selectedDate = day;
    this.shouldParseDate = false;
    this.writeValue(day.format('DD.MM.YYYY'));
    this.shouldParseDate = true;
    this.toggleCalendar(false);
    this.changeDetectorRef.markForCheck();
  }

  public getMonthString(): string {
    const rawString = this.monthYearRange[this.monthYearRangeIndex].format('MMMM YYYY');
    return rawString.charAt(0).toUpperCase() + rawString.slice(1);
  }

  public focusInput(): void {
    this.dateInput.nativeElement.focus();
  }
}
