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
  @Input() name: string;
  @ViewChild('contacts') private contactsEl: ElementRef;

  @HostListener('window:scroll')
  private scrollListener() {
    const contactsPos = this.contactsEl.nativeElement.getBoundingClientRect();

    if (contactsPos.y + contactsPos.height <= window.innerHeight) {
      this.contactsIsShown = true;
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    const contacts = (this.data.pageData as Array<IContact>);
    const viberCnt: IContact = contacts.find((contact: IContact) => contact.type === 'viber');
    const telegramCnt: IContact = contacts.find((contact: IContact) => contact.type === 'telegram');

    contacts.forEach((contact: IContact) => {
      switch (contact.type) {
        case 'phone':
          contact.viberDesktop = `viber://chat?number=${viberCnt.account}`;
          contact.viberMobile = `viber://add?number=${viberCnt.account}`;
          contact.telegram = `tg://resolve?domain=${telegramCnt.account}`;
          contact.linkto = `tel:${contact.account}`;
          break;
        case 'skype':
          contact.linkto = `skype:${contact.account}?chat`;
          break;
        case 'email':
          contact.linkto = `mailto:${this.name}<${contact.account}>`;
          break;
        default:
          break;
      }
    });
    this.scrollListener();
  }
}
