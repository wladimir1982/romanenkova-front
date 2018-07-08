import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('some data', this.route.snapshot.data);
  }

}
