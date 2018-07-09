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
    this.title = this.route.snapshot.data.title;
    this.nav = this.route.snapshot.data.navigation;

    this.router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd): void => {
        if (e.urlAfterRedirects === '/') {
          this.src = 'assets/header-main.png';
        } else {
          this.src = 'assets/header-common.png';
        }
      });
  }

}
