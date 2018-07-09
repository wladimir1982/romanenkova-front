import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {environment} from "../environments/environment";
import {Observable, of} from "rxjs/index";
import {map, tap} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const storedLang = localStorage.getItem('lang');

    if (route.params.lang === 'en' || route.params.lang === 'ru' || route.params.lang === 'uk') {
      localStorage.setItem('lang', route.params.lang);
      return of(true);
    }

    if (storedLang) {
      this.route.navigate([storedLang]);
      return of(false);
    }

    return this.httpClient.get<{ lang: string }>(environment.api + 'language')
      .pipe(
        tap((lang: { lang: string }) => {
          localStorage.setItem('lang', lang.lang);
          this.route.navigate([lang.lang]);
        }),
        map(() => false)
      )
  }

  constructor(private route: Router, private httpClient: HttpClient) { }
}
