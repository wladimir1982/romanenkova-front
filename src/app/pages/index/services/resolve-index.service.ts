import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {INavigationItem, INavigationUrl} from "../../../interfaces/iNavigation";

@Injectable({
  providedIn: 'root'
})
export class ResolveIndexService {
  private navigationUrls: Array<INavigationUrl> = [
    {href: '/', anchor: 'main'},
    {href: '/about', anchor: 'about'},
    {href: '/services', anchor: 'services'},
    {href: '/diplomas', anchor: 'diplomas'},
    {href: '/articles', anchor: 'articles'},
    {href: '/contacts', anchor: 'contacts'}
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{title: Array<string>, navigation: Array<INavigationItem>}> {
    return this.httpClient.get<Array<INavigationItem>>(environment.api + 'interface', {params: {lang: route.params.lang, id: 'nav'}})
      .pipe(map((data: Array<INavigationItem>) => {
        const title: Array<string> = (data[0].name as string).split(' ');

        data.splice(0, 1);

        this.navigationUrls.forEach((navUrl: INavigationUrl) => {
          const navItem = data.find((item: INavigationItem) => item.anchor === navUrl.anchor);

          if (navItem) {
            navItem.href = navUrl.href;
          }
        });

        return {title, navigation: data}
      }))
  }

  constructor(private httpClient: HttpClient) {
  }
}
