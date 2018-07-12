import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import IPage from "../../../interfaces/iPage";
import {INavigationItem, INavigationUrl} from "../../../interfaces/iNavigation";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ResolveFooterService implements Resolve<IPage> {
  resolve(route: ActivatedRouteSnapshot): Observable<IPage> {
    return this.httpClient.get<IPage>(environment.api + 'interface', {params: {lang: route.params.lang, id: 'contacts'}});
  }

  constructor(private httpClient: HttpClient) { }
}
