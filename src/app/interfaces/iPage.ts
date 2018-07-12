import {INavigationItem} from "./iNavigation";
import {IContact} from "./iContact";

export default interface IPage {
  header?: string;
  body?: string | Array<INavigationItem> | Array<IContact>;
  entityId?: string;
}
