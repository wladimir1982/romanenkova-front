import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SwiperConfigInterface, SwiperComponent, SwiperDirective} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent<T> implements OnInit {
  @Input() public template: Array<TemplateRef<T>>;
  @Input() public slides: Array<T>;
  @ViewChild('swiper') public swiper: SwiperComponent;

  public swiperDirective: SwiperDirective;
  public index: number = 0;
  public config: SwiperConfigInterface = {
    slidesPerView: 'auto',
    direction: 'horizontal'
  };

  constructor() {
  }

  public slideNext() {
    this.swiperDirective.nextSlide();
  }

  public slidePrev() {
    this.swiperDirective.prevSlide();
  }

  ngOnInit() {
    this.swiperDirective = this.swiper.directiveRef;
  }
}
