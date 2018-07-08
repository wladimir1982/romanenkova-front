export interface INavigationItem {
  name: string | Array<string>;
  anchor: string;
  href?: string;
}

export interface INavigationUrl {
  anchor: string;
  href?: string;
}
