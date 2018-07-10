import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public header: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.header = this.route.snapshot.data.header;
  }
}
