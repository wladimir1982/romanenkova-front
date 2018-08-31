import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef,
  ViewChild
} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {IModalAppointment} from '../../../../interfaces/iModalAppointment';
import IPage from '../../../../interfaces/iPage';
import {FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective} from "@angular/forms";
import {LanguageGuardService} from "../../../../language-guard.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {ReCaptcha2Component} from "ngx-captcha";

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

  constructor(private modalService: ModalService,
              private formBuilder: FormBuilder,
              private languageGuardService: LanguageGuardService,
              private httpClient: HttpClient,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.modalAppointment = this.modalService.modalAppointment;
    this.formGroup = this.formBuilder.group({
      name: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),
      message: new FormControl(),
      service: new FormControl(),
      recaptcha:  new FormControl('', Validators.required)
    });
    this.lang = this.languageGuardService.selectedLang;
  }

  openModal(tpl: TemplateRef<any>) {
    this.modalService.openModal('appointment', tpl, this.modalAppointment);
  }

  submit(e: FormGroupDirective, captchaElement: ReCaptcha2Component) {
    this.errorObj = {};
    this.httpClient.post(environment.api + 'appointment', e.value).subscribe((data: any) => {
      this.modalService.closeModal('appointment', 'success', e.value);
      this.modalService.openModal('appointment', this.modalAppointmentMessageRef, {header: data.h, text: data.m});
      captchaElement.resetCaptcha();
      captchaElement.reloadCaptcha();
      this.changeDetectorRef.markForCheck();
    }, (err: any) => {
      console.log(err);
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
}
