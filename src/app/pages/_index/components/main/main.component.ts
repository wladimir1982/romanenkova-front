import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import IPage from '../../../../interfaces/iPage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public header: string;
  public aboutPage: IPage<string>;
  public name: string;
  public position: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.header = this.route.snapshot.data.header;
    this.aboutPage = this.route.snapshot.data.pageBlocks.find((page: IPage<any>) => page.entityId === 'about');
    this.position = this.route.snapshot.data.headerData.position;
    this.name = this.route.snapshot.data.headerData.name;
  }
}
