import { Injectable } from '@angular/core';
import {LanguageGuardService} from '../../../language-guard.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import IPage from '../../../interfaces/iPage';

@Injectable({
  providedIn: 'root'
})
export class ResolveMainPageService implements Resolve<Array<any>> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> {
    const lang = this.languageGuard.selectedLang;
    const aboutPage$ = this.httpClient.get<IPage<string>>(environment.api + 'interface', {params: {lang, id: ['about']}});

    return combineLatest([aboutPage$]);
  }

  constructor(private languageGuard: LanguageGuardService, private httpClient: HttpClient) { }
}
