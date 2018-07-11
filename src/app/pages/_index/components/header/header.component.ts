import {Component, Input, OnInit} from '@angular/core';
import {INavigationItem} from '../../../../interfaces/iNavigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() src: string;
  @Input() header: string;
  @Input() attend: string;
  @Input() title: Array<string>;
  @Input() nav: Array<INavigationItem>;

  ngOnInit() {
  }
}
