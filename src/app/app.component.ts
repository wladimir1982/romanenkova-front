import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public src: string;

  constructor(private router: Router) {
    // this.router.events
    //   .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
    //   .subscribe((e: NavigationEnd): void => {
    //     if (e.urlAfterRedirects === '/') {
    //       this.src = 'assets/header-main.png';
    //     } else {
    //       this.src = 'assets/header-common.png';
    //     }
    //   });
  }
  title = 'app';
}
