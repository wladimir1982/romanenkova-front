import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef,
  ViewChild
} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {IModalAppointment} from '../../../../interfaces/iModalAppointment';
import IPage from '../../../../interfaces/iPage';
import {FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';
import {LanguageGuardService} from '../../../../language-guard.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ReCaptcha2Component} from 'ngx-captcha';
import {ResolveScheduleService} from '../../../../resolve-schedule.service';
import {Moment} from 'moment';
import {ISchedule} from '../../../../interfaces/iSchedule';
import * as initMoment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(initMoment);

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;
  @ViewChild('modalAppointment') private modalAppointmentRef: TemplateRef<any>;
  @ViewChild('modalAppointmentMessage') private modalAppointmentMessageRef: TemplateRef<any>;

  public formGroup: FormGroup;
  public modalAppointment: IPage<IModalAppointment>;
  public lang: string;
  public errorObj: any = {};
  private isCaptchaResolved: boolean;
  public isSubmitting: boolean;
  public schedule: any;
  public dateControl: FormControl = new FormControl();
  private timeControl: FormControl = new FormControl({value: '', disabled: !this.dateControl.value});
  public timeSlots: Array<string> = [];

  constructor(private modalService: ModalService,
              private formBuilder: FormBuilder,
              private languageGuardService: LanguageGuardService,
              private httpClient: HttpClient,
              private changeDetectorRef: ChangeDetectorRef,
              private scheduleService: ResolveScheduleService) {
  }

  ngOnInit() {
    this.modalAppointment = this.modalService.modalAppointment;
    this.formGroup = this.formBuilder.group({
      name: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      date: this.dateControl,
      time: this.timeControl,
      message: new FormControl(),
      service: new FormControl(),
      recaptcha: new FormControl('', Validators.required)
    });
    this.lang = this.languageGuardService.selectedLang;
    this.schedule = this.scheduleService.schedule;
    this.dateControl.valueChanges.subscribe((newValue: Moment) => {
      this.getTimeSlots(newValue);
      if (this.timeSlots.indexOf(this.timeControl.value) === -1) {
        this.timeControl.setValue(null);
      }
      if (newValue && this.timeSlots.length) {
        this.timeControl.enable();
      } else {
        this.timeControl.disable();
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  openModal(tpl: TemplateRef<any>) {
    this.modalService.openModal('appointment', tpl, this.modalAppointment);
  }

  submit(e: FormGroupDirective, captchaElement: ReCaptcha2Component) {
    this.errorObj = {};
    this.isSubmitting = true;
    this.httpClient.post(environment.api + 'appointment', {...e.value, date: e.value.date.format('DD.MM.YYYY')}).subscribe((data: any) => {
      this.isSubmitting = false;
      this.modalService.closeModal('appointment', 'success', e.value);
      this.modalService.openModal('appointment', this.modalAppointmentMessageRef, {header: data.h, text: data.m});
      captchaElement.resetCaptcha();
      captchaElement.reloadCaptcha();
      this.changeDetectorRef.markForCheck();
    }, (err: any) => {
      this.isSubmitting = false;
      captchaElement.resetCaptcha();
      captchaElement.reloadCaptcha();
      this.errorObj.name = err.error.name;
      this.errorObj.contact = err.error.contact;
      this.changeDetectorRef.markForCheck();
    });
  }

  handleExpire() {
    this.isCaptchaResolved = false;
  }

  handleSuccess($event) {
    this.isCaptchaResolved = true;
  }

  getTimeSlots(date: Moment): void {
    this.timeSlots.length = 0;
    if (!date) {
      return;
    }
    const weekdaysMapper = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
    const schedule = (this.schedule.find((scheduleItem: ISchedule): boolean => date.isSame(moment(scheduleItem.date, 'DD.MM.YYYY')))
      || this.schedule.find((scheduleItem: ISchedule): boolean => scheduleItem.weekday === weekdaysMapper[date.weekday()])).availableHours;

    schedule.forEach((hours: string, index: number): void => {
      const hoursArr = hours.split('-');
      const start = moment(hoursArr[0], 'HH:mm');
      const end = moment(hoursArr[1], 'HH:mm');
      const range = moment.range(start, end);
      const slots = Array
        .from(range.by('hours'))
        .map((startTime: Moment): string =>
          `${startTime.format('HH:mm')} - ${startTime.add(1, 'hour').format('HH:mm')}`);
      if (index < schedule.length - 1) {
        slots.push('_');
      }
      this.timeSlots.push(...slots);
    });
  }
}
