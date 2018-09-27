import {TLinkTo} from './types';

export interface IContact {
  name: string;
  account: string;
  linkto: TLinkTo;
  viberMobile?: string;
  viberDesktop?: string;
  telegram: string;
}
