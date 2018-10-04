import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IContact} from '../../../../../interfaces/iContact';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialComponent implements OnInit {
  @Input() contactData: Array<IContact>;

  public instagramLink: string;
  public facebookLink: string;

  constructor() { }

  ngOnInit() {
    this.contactData.forEach((contact: IContact) => {
      switch (contact.type) {
        case 'facebook':
          this.facebookLink = `https://www.facebook.com/${contact.account}/`;
          break;
        case 'instagram':
          this.instagramLink = `https://www.instagram.com/${contact.account}/`;
          break;
        default:
          break;
      }
    });
  }

}
