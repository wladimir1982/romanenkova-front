import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {DOCUMENT} from '@angular/common';
import {ILangItem} from '../../../../interfaces/iLangItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isFixed: boolean = false;
  public open: boolean = true;
  public lang: string = 'eng';
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
    this.isFixed = scrollTop > 0;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
  }

  setLanguage(lang: ILangItem) {
    this.open = false;
    console.log(lang);
  }
}
