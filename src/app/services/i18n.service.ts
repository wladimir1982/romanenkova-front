import {Injectable} from '@angular/core';
import {LanguageGuardService} from '../language-guard.service';
import {LocaleSpecification} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private momentLocalization: {[key: string]: LocaleSpecification} = {
    ru: {
      weekdays: [],
      weekdaysMin: [],
      weekdaysShort: [],
      longDateFormat: {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
      }
    }
  };

  constructor(private languageGuardService: LanguageGuardService) {
  }

  public getMomentLocalization(): LocaleSpecification {
    const lang = this.languageGuardService.selectedLang;
    return {};
  }
}
