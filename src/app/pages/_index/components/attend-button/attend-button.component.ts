import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html',
  styleUrls: ['./attend-button.component.scss']
})
export class AttendButtonComponent implements OnInit {
  @Input() public text: string;

  constructor() { }

  ngOnInit() {
  }

}
