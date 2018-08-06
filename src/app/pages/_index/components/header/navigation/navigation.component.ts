import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {INavigationItem} from '../../../../../interfaces/iNavigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  @Input() public nav: Array<INavigationItem>;

  constructor() {
  }

  ngOnInit() {
  }

}
