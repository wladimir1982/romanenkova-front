import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import IPage from '../../../../interfaces/iPage';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-overview-about',
  templateUrl: './overview-about.component.html',
  styleUrls: ['./overview-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewAboutComponent implements OnInit {
  public isShown: boolean;
  public mainText: string;

  @Input() public blockData: IPage<string>;
  @Input() public name: string;
  @Input() public position: string;
  @ViewChild('el') private el: ElementRef;
  @HostListener('window:scroll')
  private listener() {
    const elPos = this.el.nativeElement.getBoundingClientRect();

    if (elPos.y + elPos.height <= window.innerHeight) {
      this.isShown = true;
    }
  }


  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.mainText = (this.blockData.pageData as string)
      .split('\n')
      .filter((s: string) => Boolean(s))[0];

    this.listener();
  }

}
