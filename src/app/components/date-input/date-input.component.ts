import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as Moment from 'moment';
import {DateRange, extendMoment} from 'moment-range';
import {LanguageGuardService} from '../../language-guard.service';


import {ISchedule} from '../../interfaces/iSchedule';
import {TWeekday} from '../../interfaces/types';


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
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() icon?: string;
  @Input() events$: Observable<Event>;
  @Input() control: FormControl;
  @Input() schedule: Array<ISchedule>;
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
  public parsedDate: string;
  private unavailableDates: Array<Moment.Moment>;
  private availableDates: Array<Moment.Moment>;
  private unavailableWeekdays: Array<TWeekday>;
  private onTouch: () => void;
  private onChange: (v: Moment.Moment) => void = (v: Moment.Moment) => {};

  constructor(private changeDetectorRef: ChangeDetectorRef, private languageService: LanguageGuardService) {
  }

  public writeValueFromTemplate(value: string) {
    const parsedDate = moment(value, [
      'DD.MM.YYYY',
      'DD,MM,YYYY',
      'DD-MM-YYYY',
      'MM/DD/YYYY',
      'YYYY-MM-DD',
      'DD.MM',
      'DD,MM',
      'DD-MM',
      'MM/DD',
      'MM-DD'
    ]).startOf('day');

    this.value = value;

    if (!value) {
      this.onChange(value);
    }
    if (this.shouldParseDate) {
      const parsedDate = moment(value, ['DD.MM.YYYY', 'DD,MM,YYYY', 'DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD.MM', 'DD,MM',
        'DD-MM', 'MM/DD', 'MM-DD'])
        .startOf('day');
      if (!parsedDate.isValid() || !parsedDate.within(this.range)) {
        this.parsedDate = '';
        this.onChange('');
        return;
      }

    if (parsedDate.isValid() && parsedDate.within(this.range) && this.getAvailability(parsedDate)) {
      this.writeValue(parsedDate);
      this.selectedDate = parsedDate;
    } else {
      this.control.setErrors({
        invalid: !parsedDate.isValid(),
        notInRange: !parsedDate.within(this.range),
        notAvailable: this.getAvailability(parsedDate)
      });
      this.selectedDate = moment().startOf('day');
      this.parsedDate = '';
      this.onChange(null);
    }
  }

  public writeValue(value: Moment.Moment): void {
    this.parsedDate = value ? `(${value.format('DD MMMM YYYY')})` : '';
    this.control.setErrors(null);
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
        this.changeDetectorRef.markForCheck();
      });

    this.unavailableDates = this.schedule
      .filter((scheduleItem: ISchedule): boolean => scheduleItem.date && scheduleItem.availableHours.length === 0)
      .map((scheduleItem: ISchedule): Moment.Moment => moment(scheduleItem.date, 'DD.MM.YYYY'));

    this.availableDates = this.schedule
      .filter((scheduleItem: ISchedule): boolean => scheduleItem.date && scheduleItem.availableHours.length > 0)
      .map((scheduleItem: ISchedule): Moment.Moment => moment(scheduleItem.date, 'DD.MM.YYYY'));

    this.unavailableWeekdays = this.schedule
      .filter((scheduleItem: ISchedule): boolean => !scheduleItem.date && scheduleItem.availableHours.length === 0)
      .map((scheduleItem: ISchedule): TWeekday => scheduleItem.weekday);
  }

  public input($event): void {
    this.textValue = $event.data;
  }

  public toggleCalendar(state?: boolean): void {
    state !== undefined ? this.isCalendarOpen = state : this.isCalendarOpen = !this.isCalendarOpen;
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
    this.value = day.format('DD.MM.YYYY');
    this.control.enable();
    this.selectedDate = day;
    this.writeValue(day);
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

  public onBlurInput() {
    this.value = this.parsedDate ? this.selectedDate.format('DD.MM.YYYY') : this.value;
  }

  public getAvailability(date: Moment.Moment): boolean {
    const weekdaysMapper: Array<TWeekday> = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
    const weekday: TWeekday = weekdaysMapper[date.weekday()];
    const isAvailableByWeekday = this.unavailableWeekdays.indexOf(weekday) === -1;
    const isUnavailableByDate = this.unavailableDates.findIndex((unavailableDate: Moment.Moment): boolean => unavailableDate.isSame(date)) > -1;
    const isAvailableByDate = this.availableDates.findIndex((availableDate: Moment.Moment): boolean => availableDate.isSame(date)) > -1;

    if (isUnavailableByDate) {
      return false;
    }

    if (isAvailableByDate) {
      return true;
    }

    return isAvailableByWeekday;
  }
}
