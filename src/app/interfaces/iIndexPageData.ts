import {INavigationItem} from './iNavigation';
import {IContact} from './iContact';
import IPage from './iPage';
import {IModalAppointment} from './iModalAppointment';

export interface IIndexPageData {
  title: [string, string];
  navigation: Array<INavigationItem>;
  buttonText: string;
  contacts: IPage<IContact>;
  name: string;
  position: string;
  modalAppointment: IPage<IModalAppointment>;
}
