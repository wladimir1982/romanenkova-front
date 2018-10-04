import {Injectable} from '@angular/core';
import {LanguageGuardService} from '../language-guard.service';
import {LocaleSpecification} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private momentLocalization: {[key: string]: LocaleSpecification} = {
    ru: {}
  };
  private _clearSelectionLabel: string;
  set clearSelectionLabel(value: string) {
    if (!this._clearSelectionLabel) {
      this._clearSelectionLabel = value;
    } else {
      throw new Error('Cannot rewrite value after it has been set.');
    }
  }
  get clearSelectionLabel() {
    return this._clearSelectionLabel;
  }

  constructor(private languageGuardService: LanguageGuardService) {
  }

  public getMomentLocalization(): LocaleSpecification {
    const lang = this.languageGuardService.selectedLang;
    return {};
  }
}
