import {TLanguage} from "./types";
import {ILangItem} from "./iLangItem";

export interface ILanguageResponse {
  lang: TLanguage;
  availableLangs: Array<ILangItem>;
}
