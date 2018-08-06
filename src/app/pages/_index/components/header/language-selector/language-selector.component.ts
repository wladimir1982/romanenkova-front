import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ILangItem} from '../../../../../interfaces/iLangItem';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {LanguageGuardService} from '../../../../../language-guard.service';
import {filter} from 'rxjs/internal/operators';
import {ILanguageState} from '../header.component';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  public lang: ILangItem;
  public languages: Array<ILangItem>;

  @Input() public isLanguageListOpen: ILanguageState;

  constructor(private route: ActivatedRoute, private router: Router, private languageGuardService: LanguageGuardService) {
  }

  ngOnInit() {
    const currentLang: string = this.languageGuardService.selectedLang;
    this.languages = this.languageGuardService.langItems;

    this.languages.forEach((lang: ILangItem) => {
      lang.href = this.router.url.replace(/^\/(en|ru|uk|fr)?(\/|$)/gmi, `/${lang.code}/`);
    });

    this.lang = this.languages.find((lang: ILangItem) => lang.code === currentLang);

    this.router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd): void => {
        this.languages.forEach((lang: ILangItem) => {
          lang.href = this.router.url.replace(/^\/(en|ru|uk|fr)?(\/|$)/gmi, `/${lang.code}/`);
        });
      });
  }

  public open() {
    this.isLanguageListOpen.open = true;
  }

  public close() {
    this.isLanguageListOpen.open = false;
  }
}
