import {Component, Input, OnInit} from '@angular/core';
import IPage from "../../../../interfaces/iPage";
import {IContact} from "../../../../interfaces/iContact";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() data: IPage<IContact>;
  @Input() attend: string;

  constructor() { }

  ngOnInit() {
  }
}
