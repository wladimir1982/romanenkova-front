import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() public template: Array<TemplateRef<any>>;
  @Input() public context: any;

  constructor() { }

  ngOnInit() {
    console.log(this.template);
  }

}
