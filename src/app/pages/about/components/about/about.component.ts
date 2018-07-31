import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public mainText: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mainText = this.route.snapshot.data.pageData.pageData;
  }

}
