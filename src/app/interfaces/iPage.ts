import {INavigationItem} from './iNavigation';
import {IContact} from './iContact';

export default interface IPage {
  header: string;
  body?: string | Array<INavigationItem> | Array<IContact>;
  entityId: 'nav' | 'contacts' | 'about' | 'diploma' | 'service' | 'article';
  language: 'en' | 'ru' | 'uk';
}
