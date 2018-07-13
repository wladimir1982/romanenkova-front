import {Component, Input, OnInit} from '@angular/core';
import IPage from '../../../../interfaces/iPage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() data: IPage;
  @Input() attend: string;

  constructor() { }

  ngOnInit() {
  }

}
