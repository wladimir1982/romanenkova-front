import {ChangeDetectionStrategy, Component, OnInit, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  public mainText: Array<string> = [];
  public photos: Array<string>;
  public name: Array<string>;

  @ViewChildren('photo') photo: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mainText = this.route.snapshot.data.pageData.pageData.split('\n').filter((s: string) => Boolean(s));
    this.name = this.route.snapshot.data.pageData.name.split(/\s/).filter((s: string) => Boolean(s));
    this.photos = this.route.snapshot.data.pageData.images;
  }
}
