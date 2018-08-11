import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent<T> implements OnInit {
  @Input() public template: Array<TemplateRef<T>>;
  @Input() public slides: Array<T>;

  constructor() { }

  ngOnInit() {
  }
}
