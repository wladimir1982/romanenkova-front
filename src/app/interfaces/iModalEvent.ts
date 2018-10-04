import {TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

export interface IModalEvent<T = any> {
  name: string;
  success: boolean;
  type: 'open' | 'dismiss' | 'success';
  template?: TemplateRef<T>;
  context?: T;
  resolve?: T | Observable<T>;
}
