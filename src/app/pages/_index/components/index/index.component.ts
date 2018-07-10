import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public title: Array<string>;
  public nav: Array<INavigationItem>;
  public src: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // todo: perform more clear way to receive data
    console.log('resolve data for index', this.route.snapshot['_resolvedData'].data.isRoot);
    this.title = this.route.snapshot['_resolvedData'].data.title;
    this.nav = this.route.snapshot['_resolvedData'].data.navigation;
    this.src = this.route.snapshot['_resolvedData'].data.isRoot ? 'assets/header-main.png' : 'assets/header-common.png';
  }
}
