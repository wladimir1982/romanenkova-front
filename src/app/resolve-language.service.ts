import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolveLanguageService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot): string {
    return route.params.lang;
  }

  constructor() { }
}
