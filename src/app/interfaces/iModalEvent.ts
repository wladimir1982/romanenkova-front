import {TemplateRef} from "@angular/core";
import {Observable} from "rxjs/index";

export interface IModalEvent<T = any> {
  success: boolean;
  type: 'open' | 'dismiss' | 'success';
  template?: TemplateRef<T>;
  context?: T;
  resolve?: T | Observable<T>;
}
