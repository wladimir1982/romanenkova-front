import {Component, Input, OnInit} from '@angular/core';
import IPage from '../../../../interfaces/iPage';
import {IContact} from "../../../../interfaces/iContact";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() data: IPage<IContact>;
  @Input() attend: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
