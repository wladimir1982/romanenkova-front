import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openModal<T>(tpl: TemplateRef<T>, ctx: T) {
    this.modalService.openModal(tpl, ctx);
  }
}
