import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {IModalAppointment} from '../../../../interfaces/iModalAppointment';
import IPage from '../../../../interfaces/iPage';
import {IModalEvent} from "../../../../interfaces/iModalEvent";
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;

  public modalAppointment: IPage<IModalAppointment>;
  public model: any = {
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  };

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalAppointment = this.modalService.modalAppointment;
    console.log(this.modalAppointment);
  }

  openModal(tpl: TemplateRef<any>) {
    this.modalService.openModal(tpl, this.modalAppointment);
  }

  submit(e) {
    console.log(e);
  }

  onCloseModal() {
    this.modalService.modalEvent.pipe(
      filter((event: IModalEvent): boolean => event.type === 'success' || event.type === "dismiss")
    ).subscribe((event: IModalEvent) => {
      console.log(event);
    })
  }
}
