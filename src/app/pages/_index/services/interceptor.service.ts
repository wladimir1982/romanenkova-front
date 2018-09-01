import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {LanguageGuardService} from "../../../language-guard.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private languagedUrls: Array<string> = ['appointment'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let shouldAddLanguage: boolean = false;
    this.languagedUrls.forEach((url: string) => {
      if (req.url.includes(url)) {
        shouldAddLanguage = true;
      }
    });

    if (!shouldAddLanguage) {
      return next.handle(req);
    }

    let params: HttpParams = new HttpParams();

    req.params.keys().forEach((key: string) => {
      params = params.set(key, req.params.get(key));
    });
    if (!params.get('language')) {
      params = params.set('language', this.languageGuardService.selectedLang);
    }

    const newReq = req.clone({params});

    console.log(newReq);

    return next.handle(newReq);
  }

  constructor(private languageGuardService: LanguageGuardService) { }
}
