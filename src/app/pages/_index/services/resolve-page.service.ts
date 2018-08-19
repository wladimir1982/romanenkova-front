import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import IPage from '../../../interfaces/iPage';
import {HttpClient} from '@angular/common/http';
import {ResolveIndexService} from './resolve-index.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolvePageService implements Resolve<IPage<any>> {
  resolve(route: ActivatedRouteSnapshot): Observable<IPage<any>> {
    const lang = localStorage.getItem('lang');
    if (route.data.pageid) {
      return this.httpClient.get<IPage<any>>(environment.api + 'interface', {params: {lang, id: route.data.pageid}})
        .pipe(map((res: IPage<any>): IPage<any> => ({...res, name: this.indexService.name})));
    }

    return null;
  }

  constructor(private httpClient: HttpClient, private indexService: ResolveIndexService) { }
}
