import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {map, tap, timeout} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ResolveLanguageService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const storedLang = localStorage.getItem('lang');

    if (route.params.lang === 'en' || route.params.lang === 'ru' || route.params.lang === 'uk') {
      localStorage.setItem('lang', route.params.lang);
      return of(route.params.lang);
    }

    if (storedLang) {
      this.route.navigate([storedLang]);
      return of(storedLang);
    }

    return this.httpClient.get<{ lang: string }>(environment.api + 'language')
      .pipe(
        tap((lang: { lang: string }) => {
          localStorage.setItem('lang', lang.lang);
          this.route.navigate([lang.lang]);
        }),
        map((lang: { lang: string }) => lang.lang)
      )
  }

  constructor(private httpClient: HttpClient, private route: Router) { }
}
