import {INavigationItem} from "./iNavigation";
import {IContact} from "./iContact";
import IPage from "./iPage";

export interface IIndexPageData {
  title: [string, string];
  navigation: Array<INavigationItem>;
  buttonText: string;
  contacts: IPage;
  name: string;
}
