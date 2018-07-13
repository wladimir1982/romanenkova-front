import {Component, Input, OnInit} from '@angular/core';
import IPage from "../../../../interfaces/iPage";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() data: IPage;
  @Input() attend: string;

  constructor() { }

  ngOnInit() {
    console.log('fromContacts', this.data);
  }

}
