import {INavigationItem} from './iNavigation';
import {IContact} from './iContact';
import {TLanguage, TPageId} from "./types";

export default interface IPage {
  header: string;
  pageData?: string | Array<INavigationItem> | Array<IContact>;
  entityId: TPageId;
  language: TLanguage;
}
