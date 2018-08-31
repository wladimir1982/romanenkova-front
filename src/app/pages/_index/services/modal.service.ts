import {Injectable, TemplateRef} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/internal/operators";
import IPage from "../../../interfaces/iPage";
import {IModalAppointment} from "../../../interfaces/iModalAppointment";
import {Subject} from "rxjs/index";
import {IModalEvent} from "../../../interfaces/iModalEvent";
import {logger} from "codelyzer/util/logger";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modalAppointment: IPage<IModalAppointment>;
  private _modalEvent: Subject<IModalEvent> = new Subject<IModalEvent>();
  public set modalAppointment(value: IPage<IModalAppointment>) {
    if (this._modalAppointment) {
      throw new Error('Modal appointment is already set')
    }

    this._modalAppointment = value;
  }
  public get modalAppointment(): IPage<IModalAppointment> {
    return this._modalAppointment;
  }
  public get modalEvent() {
    return this._modalEvent.asObservable();
  }

  public openModal(name: string, tpl: TemplateRef<any>, ctx: any) {
    this._modalEvent.next({name, type: 'open', success: true, template: tpl, context: ctx});
  }

  public closeModal(name: string, type: 'dismiss' | 'success', data: any) {
    this._modalEvent.next({name, type, success: type === 'success', resolve: data});
  }
}
