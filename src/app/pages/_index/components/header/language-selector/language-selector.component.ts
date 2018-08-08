import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangItem} from '../../../../../interfaces/iLangItem';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {LanguageGuardService} from '../../../../../language-guard.service';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit {
  public lang: ILangItem;
  public languages: Array<ILangItem>;

  @Input() public isLanguageListOpen: boolean;
  @Output() public isLanguageListOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private languageGuardService: LanguageGuardService, private changeDetectorRef: ChangeDetectorRef) {
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
        this.changeDetectorRef.markForCheck();
      });
  }

  public open() {
    this.isLanguageListOpen = true;
    this.isLanguageListOpenChange.emit(true);
  }

  public close() {
    this.isLanguageListOpen = false;
    this.isLanguageListOpenChange.emit(false);
  }
}
