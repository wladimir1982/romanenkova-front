import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
