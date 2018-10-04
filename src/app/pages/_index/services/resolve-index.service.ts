import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {INavigationItem, INavigationUrl} from '../../../interfaces/iNavigation';
import IPage from '../../../interfaces/iPage';
import {IIndexPageData} from '../../../interfaces/iIndexPageData';
import {IContact} from '../../../interfaces/iContact';
import {IModalAppointment} from '../../../interfaces/iModalAppointment';

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
  public name: string;

  resolve(route: ActivatedRouteSnapshot): Observable<IIndexPageData> {
    return this.httpClient.get<Array<IPage<IContact | INavigationItem > | IModalAppointment>>(environment.api + 'interface',
      {params: {lang: route.params.lang, id: ['contacts', 'nav', '[modal] appointment']}})
      .pipe(map((data: Array<IPage<IContact | INavigationItem | IModalAppointment>>): IIndexPageData => {
        const contacts: IPage<IContact> = data
          .find((page: IPage<IContact>): boolean => page.entityId === 'contacts') as IPage<IContact>;
        const header: IPage<INavigationItem> = data
          .find((page: IPage<INavigationItem>): boolean => page.entityId === 'nav') as IPage<INavigationItem>;
        const modalAppointment: IPage<IModalAppointment> = data
          .find((page: IPage<IModalAppointment>): boolean => page.entityId === '[modal] appointment') as IPage<IModalAppointment>;
        const title: [string, string] = (header.pageData[0] as INavigationItem).name as [string, string];
        const buttonText = (header.pageData[1] as INavigationItem).name as string;
        const name = ((header.pageData[2] as INavigationItem).name as [string, string, string]).splice(1).join(' ');
        const position = ((header.pageData[2] as INavigationItem).name as [string, string, string])[0];
        const navigation = (header.pageData as Array<INavigationItem>).slice(3, 8) as Array<INavigationItem>;

        (navigation as Array<INavigationItem>).forEach((navItem: INavigationItem): void => {
          const anchor: string = navItem.anchor;
          const navUrlItem: INavigationUrl = this.navigationUrls.find((navUrl: INavigationUrl): boolean => navUrl.anchor === anchor);
          navItem.href = navUrlItem.href;
        });

        this.name = name;

        return {
          title,
          buttonText,
          navigation,
          contacts,
          name,
          position,
          modalAppointment
        };
      }));
  }

  constructor(private httpClient: HttpClient) {
  }
}
