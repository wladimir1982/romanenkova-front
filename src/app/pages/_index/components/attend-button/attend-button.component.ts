import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {IModalAppointment} from '../../../../interfaces/iModalAppointment';
import IPage from '../../../../interfaces/iPage';
import {IModalEvent} from "../../../../interfaces/iModalEvent";
import {filter} from "rxjs/internal/operators";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ResolveIndexService} from "../../services/resolve-index.service";
import {ResolveLanguageService} from "../../../../resolve-language.service";
import {LanguageGuardService} from "../../../../language-guard.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;

  public formGroup: FormGroup;
  public modalAppointment: IPage<IModalAppointment>;
  public lang: string;
  private isCaptchaResolved: boolean;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private languageGuardService: LanguageGuardService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.modalAppointment = this.modalService.modalAppointment;
    console.log(this.modalAppointment);
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
    this.modalService.openModal(tpl, this.modalAppointment);
  }

  submit(e) {
    const formValue = e.value;
    this.httpClient.post(environment.api + 'appointment', formValue).subscribe();
  }

  onCloseModal() {
    this.modalService.modalEvent.pipe(
      filter((event: IModalEvent): boolean => event.type === 'success' || event.type === "dismiss")
    ).subscribe((event: IModalEvent) => {
      console.log(event);
    })
  }

  handleExpire() {
    this.isCaptchaResolved = false;
  }

  handleSuccess($event) {
    console.log($event);
    this.isCaptchaResolved = true;
  }
}
