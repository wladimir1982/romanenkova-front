import {Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import IPage from '../../../../interfaces/iPage';
import {IContact} from '../../../../interfaces/iContact';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contactsIsShown = false;

  @Input() data: IPage<IContact>;
  @Input() attend: string;
  @ViewChild('contacts') private contactsEl: ElementRef;
  @HostListener('window:scroll')
  private listener() {
    const contactsPos = this.contactsEl.nativeElement.getBoundingClientRect();

    if (contactsPos.y + contactsPos.height <= window.innerHeight) {
      this.contactsIsShown = true;
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.listener();
  }
}
