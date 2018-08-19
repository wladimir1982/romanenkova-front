import {Component, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {IModalEvent} from "../../../../interfaces/iModalEvent";
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  isModalOpen: boolean;
  template: TemplateRef<any>;
  context: any;

  constructor(private modalService: ModalService, private renderer: Renderer2) {
  }

  closeModal(status: 'dismiss' | 'success', resolve: any) {
    this.modalService.closeModal(status, resolve);
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.modalService.modalEvent.pipe(
      filter((modalEvent: IModalEvent): boolean => modalEvent.type === 'open')
    ).subscribe((data: IModalEvent): void => {
      this.isModalOpen = true;
      this.template = data.template;
      this.context = data.context;
      this.renderer.addClass(document.body, 'modal-overlay');
    })
  }

}
