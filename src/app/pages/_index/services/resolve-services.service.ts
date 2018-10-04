import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {IService} from '../../../interfaces/IService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LanguageGuardService} from '../../../language-guard.service';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolveServicesService implements Resolve<Array<IService>> {

  constructor(private httpClient: HttpClient, private languageGuardService: LanguageGuardService) { }

  resolve(): Observable<Array<IService>> {
    return this.httpClient.get<Array<IService>>(environment.api + 'service', {params: {language: this.languageGuardService.selectedLang}});
  }
}
