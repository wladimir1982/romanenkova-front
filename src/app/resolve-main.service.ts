import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import {environment} from "../environments/environment";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import IPage from "./interfaces/iPage";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResolveMainService implements Resolve<IPage> {
  private defaulltPage: IPage = {
    entityId: 'main'
  };
  resolve(route: ActivatedRouteSnapshot): Observable<IPage> {
    if (route.params.lang) {
      return this.httpClient.get<IPage>(environment.api + 'interface', {params: {lang: route.params.lang, id: 'main'}});
    }

    return of(this.defaulltPage)
  }

  constructor(private httpClient: HttpClient) { }
}
