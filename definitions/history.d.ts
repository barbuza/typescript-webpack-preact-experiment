declare module 'history' {

  interface ILocation {
    readonly pathname: string;
  }

  export interface IHistory {
    readonly location: ILocation;
    push(path: string): void;
    listen(callback: (location: ILocation) => void): void;
  }

  export function createBrowserHistory(): IHistory;
}
