import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {ISchedule} from './interfaces/iSchedule';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolveScheduleService implements Resolve<Array<ISchedule>> {
  public schedule: Array<ISchedule>;

  constructor(private httpClient: HttpClient) { }

  resolve(): Observable<Array<ISchedule>> {
    return this.httpClient.get<Array<ISchedule>>(environment.api + 'schedule')
      .pipe(
        tap((response: Array<ISchedule>): void => {
          this.schedule = response;
        })
      );
  }
}
