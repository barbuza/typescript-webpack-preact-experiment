import { Component } from '../components/Component';

export interface IData {
}

export class Page extends Component<IData, {}> {
  public render() {
    return <div>index</div>;
  }
}

export function fetchData(resolve: (data: IData) => void) {
  resolve({});
}
