import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {INavigationItem} from '../../../../interfaces/iNavigation';
import {DOCUMENT} from '@angular/common';

export interface ILanguageState {
  open: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isFixed: boolean;
  public isOpen: ILanguageState = {open: false};
  public isNavOpen: boolean;

  @Input() isRoot: boolean;
  @Input() header: string;
  @Input() attend: string;
  @Input() title: Array<string>;
  @Input() nav: Array<INavigationItem>;

  @HostListener('window:scroll')
  private listenter(e): void {
    const scrollTop = this.document.documentElement.scrollTop;
    this.isFixed = scrollTop > 35;
    this.isOpen.open = false;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    if (window.innerWidth >= 1024) {
      this.isNavOpen = true;
    }
  }

  public toggleNavOpen(state: boolean): void {
    this.isNavOpen = state;
  }
}
