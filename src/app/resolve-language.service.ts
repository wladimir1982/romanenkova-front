import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Route, Router, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResolveLanguageService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot): string {
    return route.params.lang;
  }

  constructor(private httpClient: HttpClient, private route: Router) { }
}
