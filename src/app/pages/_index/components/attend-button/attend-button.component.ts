import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {IModalAppointment} from '../../../../interfaces/iModalAppointment';
import IPage from '../../../../interfaces/iPage';

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;

  public modalAppointment: IPage<IModalAppointment>;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalAppointment = this.modalService.modalAppointment;
    console.log(this.modalAppointment);
  }

  openModal(tpl: TemplateRef<any>) {
    this.modalService.openModal(tpl, this.modalAppointment);
  }

  onCloseModal() {}
}
