import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() src: string;
  //
  // public navItems: Array<INavigationItem>;
  // public title: Array<string>;
  // public navigationUrls: Array<INavigationUrl> = [
  //   {href: '/', anchor: 'main'},
  //   {href: '/about', anchor: 'about'},
  //   {href: '/services', anchor: 'services'},
  //   {href: '/diplomas', anchor: 'diplomas'},
  //   {href: '/articles', anchor: 'articles'},
  //   {href: '/contacts', anchor: 'contacts'}
  // ];
  //
  // constructor(private httpClient: HttpClient) {
  // }
  //
  ngOnInit() {
  //   this.httpClient.get<Array<INavigationItem>>(environment.api + 'interface', {params: {lang: 'ru', id: 'nav'}})
  //     .subscribe((data: Array<INavigationItem>) => {
  //       this.title = (data[0].name as string).split(' ');
  //       data.splice(0, 1);
  //       this.navigationUrls.forEach((navUrl: INavigationUrl) => {
  //         const navItem = data.find((item: INavigationItem) => item.anchor === navUrl.anchor);
  //
  //         if (navItem) {
  //           navItem.href = navUrl.href;
  //         }
  //       });
  //       this.navItems = data;
  //     });
  }
}
