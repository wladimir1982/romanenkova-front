import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {filter, map, tap} from 'rxjs/internal/operators';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public title: Array<string>;
  public nav: Array<INavigationItem>;
  public src: string;
  public header: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    route.url.subscribe(() => {
      if (route.snapshot.firstChild.data.pageData && route.snapshot.firstChild.data.pageData.header) {
        this.header = route.snapshot.firstChild.data.pageData.header;
      }
    });
  }

  ngOnInit() {
    // todo: perform more clear way to receive data
    this.title = this.route.snapshot['_resolvedData'].data.title;
    this.nav = this.route.snapshot['_resolvedData'].data.navigation;
    this.src = this.route.snapshot['_resolvedData'].data.isRoot ? 'assets/header-main.png' : 'assets/header-common.png';
    // console.log(this.route.snapshot.params);
    // this.route.params.subscribe(data => {
    //   console.log('params', data, this.route);
    // })

    // this.router.events
    // .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
    // .subscribe((e: NavigationEnd): void => {
    //   console.log(e);
    // });
  }
}
