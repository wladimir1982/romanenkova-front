import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ActivatedRouteSnapshot} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {INavigationItem, INavigationUrl} from '../../../interfaces/iNavigation';
import IPage from "../../../interfaces/iPage";
import {IIndexPageData} from "../../../interfaces/iIndexPageData";

@Injectable({
  providedIn: 'root'
})
export class ResolveIndexService {
  private navigationUrls: Array<INavigationUrl> = [
    {href: '', anchor: 'main'},
    {href: 'about', anchor: 'about'},
    {href: 'services', anchor: 'services'},
    {href: 'diplomas', anchor: 'diplomas'},
    {href: 'articles', anchor: 'articles'},
    {href: '#contacts', anchor: 'contacts'}
  ];

  resolve(route: ActivatedRouteSnapshot): Observable<IIndexPageData> {
    return this.httpClient.get<[IPage, IPage]>(environment.api + 'interface', {params: {lang: route.params.lang, id: ['contacts', 'nav']}})
      .pipe(map((data: [IPage, IPage]): IIndexPageData => {
        const contacts: IPage = data.find((page: IPage): boolean => page.entityId === 'contacts');
        const header: IPage = data.find((page: IPage): boolean => page.entityId === 'nav');
        const rawTitle: string = (header.pageData[0] as INavigationItem).name as string;
        const title = rawTitle.split(' ') as [string, string];
        const buttonText = (header.pageData[1] as INavigationItem).name as string;
        const navigation = header.pageData.slice(2, 7) as Array<INavigationItem>;

        (navigation as Array<INavigationItem>).forEach((navItem: INavigationItem): void => {
          const anchor: string = navItem.anchor;
          const navUrlItem: INavigationUrl = this.navigationUrls.find((navUrl: INavigationUrl): boolean => navUrl.anchor === anchor);
          navItem.href = navUrlItem.href;
        });

        return {
          title,
          buttonText,
          navigation,
          contacts
        };
      }));
  }

  constructor(private httpClient: HttpClient) {
  }
}
