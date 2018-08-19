import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {IModalEvent} from "../../../../interfaces/iModalEvent";
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.modalEvent.pipe(
      filter((modalEvent: IModalEvent): boolean => modalEvent.type === 'open')
    )
      .subscribe((data: IModalEvent): void => {
        console.log(data);
      })
  }

}
