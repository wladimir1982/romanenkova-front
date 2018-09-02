import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import IPage from "../../../../interfaces/iPage";

@Component({
  selector: 'app-overview-about',
  templateUrl: './overview-about.component.html',
  styleUrls: ['./overview-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewAboutComponent implements OnInit {
  @Input() public blockData: IPage<string>;
  @Input() public name: string;
  @Input() public position: string;

  public mainText: string;

  constructor() { }

  ngOnInit() {
    this.mainText = (this.blockData.pageData as string)
      .split('\n')
      .filter((s: string) => Boolean(s))[0];

    console.log(this.blockData);
  }

}
