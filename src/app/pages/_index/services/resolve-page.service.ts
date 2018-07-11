import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {environment} from '../../../../environments/environment';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import IPage from '../../../interfaces/iPage';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResolvePageService implements Resolve<IPage> {
  resolve(route: ActivatedRouteSnapshot): Observable<IPage> {
    const lang = localStorage.getItem('lang');
    console.log('resolver', route.params, route.data.pageid);
    if (route.data.pageid) {
      return this.httpClient.get<IPage>(environment.api + 'interface', {params: {lang, id: route.data.pageid}});
    }

    return null;
  }

  constructor(private httpClient: HttpClient) { }
}
