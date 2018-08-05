import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {environment} from "../environments/environment";
import {Observable, of, ReplaySubject} from "rxjs/index";
import {map, tap} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";
import {TLanguage} from "./interfaces/types";
import {ILanguageResponse} from "./interfaces/iResponse";
import {ILangItem} from "./interfaces/iLangItem";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuardService implements CanActivate {
  public langItems: Array<ILangItem>;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const storedLang = localStorage.getItem('lang');
    const resolver = new ReplaySubject<boolean>();
    let lang;
    let availableLangs: Array<TLanguage>;

    this.httpClient.get<ILanguageResponse>(environment.api + 'language')
      .subscribe((data: ILanguageResponse) => {
        lang = data.lang;
        availableLangs = data.availableLangs.map((lang: any) => lang.code);
        this.langItems = data.availableLangs;

        if (availableLangs.indexOf(route.params.lang) > -1) {
          localStorage.setItem('lang', route.params.lang);
          resolver.next(true);
          resolver.complete();
          return;
        }

        if (storedLang) {
          this.route.navigate([storedLang]);
        }

        localStorage.setItem('lang', lang);
        resolver.next(false);
        resolver.complete();
      });

    return resolver.asObservable();
  }

  constructor(private route: Router, private httpClient: HttpClient) {
  }
}
