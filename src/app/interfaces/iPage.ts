import {INavigationItem} from './iNavigation';
import {IContact} from './iContact';
import {TLanguage, TPageId} from "./types";

export default interface IPage<T> {
  header: string;
  pageData?: T | Array<T>;
  entityId: TPageId;
  language: TLanguage;
  name?: string;
}
