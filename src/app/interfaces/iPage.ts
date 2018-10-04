
import {TLanguage, TPageId} from './types';

export default interface IPage<T> {
  header: string;
  pageData?: T | Array<T>;
  entityId: TPageId;
  language: TLanguage;
  name?: string;
  images?: Array<string>;
}
