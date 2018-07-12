import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {DOCUMENT} from '@angular/common';
import {ILangItem} from '../../../../interfaces/iLangItem';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isFixed: boolean = false;
  public isOpen: boolean = false;
  public lang: string;
  public languages: Array<ILangItem> = [
    {code: 'en', name: 'Eng'},
    {code: 'ru', name: 'Рус'},
    {code: 'uk', name: 'Укр'}
  ];

  @Input() src: string;
  @Input() header: string;
  @Input() attend: string;
  @Input() title: Array<string>;
  @Input() nav: Array<INavigationItem>;

  @HostListener('window:scroll')
  private listenter(e): void {
    const scrollTop = this.document.documentElement.scrollTop;
    this.isFixed = scrollTop > 35;
    this.isOpen = false;
  }

  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, private router: Router) {
    router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd): void => {
        this.languages.forEach((lang: ILangItem) => {
          lang.href = this.router.url.replace(/^\/(en|ru|uk)?(\/)/gmi, `/${lang.code}/`);
        });
      });
  }

  ngOnInit() {
    const currentLang: string = localStorage.getItem('lang');
    this.lang = this.languages.find((lang: ILangItem) => lang.code === currentLang).name;
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }
}
