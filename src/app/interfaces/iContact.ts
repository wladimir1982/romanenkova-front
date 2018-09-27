import {TLinkTo} from './types';

export interface IContact {
  name: string;
  account: string;
  linkto: string;
  viberMobile?: string;
  viberDesktop?: string;
  telegram?: string;
  type: string;
}
