import Component from '../components/Component';

export interface IData {
}

export default class Index extends Component<IData, {}> {
  public render() {
    return <div>index</div>;
  }
}

export function fetchData(resolve: (data: IData) => void) {
  resolve({});
}
