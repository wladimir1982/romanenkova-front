import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface iNavigationItem {
  name: string | Array<string>;
  anchor: string;
  href?: string;
}

export interface iNavigationUrl {
  anchor: string;
  href?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() src: string;

  public navItems: Array<iNavigationItem>;
  public title: Array<string>;
  public navigationUrls: Array<iNavigationUrl> = [
    {href: "/", anchor: "main"},
    {href: "/about", anchor: "about"},
    {href: "/services", anchor: "services"},
    {href: "/diplomas", anchor: "diplomas"},
    {href: "/articles", anchor: "articles"},
    {href: "/contacts", anchor: "contacts"}
  ];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<Array<iNavigationItem>>(environment.api + 'interface', {params: {lang: 'en', id: 'nav'}})
      .subscribe((data: Array<iNavigationItem>) => {
        this.title = (data[0].name as string).split(' ');
        const rawNav = data;
        rawNav.splice(0, 1);
        this.navigationUrls.forEach((navUrl: iNavigationUrl) => {
          const navItem = rawNav.find((item: iNavigationItem) => item.anchor === navUrl.anchor);

          if (navItem) {
            navItem.href = navUrl.href;
          }
        });
        this.navItems = rawNav;
      })
  }
}
