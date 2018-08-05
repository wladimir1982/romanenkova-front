import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {filter, map, tap} from 'rxjs/internal/operators';
import {Observable} from "rxjs/index";
import IPage from "../../../../interfaces/iPage";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public title: Array<string>;
  public nav: Array<INavigationItem>;
  public isRoot: boolean;
  public header: string;
  public attend: string;
  public footer: IPage;

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd): void => {
        this.header = route.snapshot.firstChild.data.pageData.header;
        this.isRoot = Boolean(this.route.snapshot.firstChild.data.headerData);
      });
  }

  ngOnInit() {
    // todo: perform more clear way to receive data
    this.title = this.route.snapshot['_resolvedData'].headerData.title;
    this.nav = this.route.snapshot['_resolvedData'].headerData.navigation;
    this.footer = this.route.snapshot['_resolvedData'].headerData.contacts;
    this.attend = this.route.snapshot['_resolvedData'].headerData.buttonText;
  }
}
