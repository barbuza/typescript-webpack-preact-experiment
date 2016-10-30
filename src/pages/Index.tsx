import Component from '../components/Component';
import { connect } from 'mobx-preact';

export interface Data {

}

@connect
export default class Index extends Component<Data, {}> {
  render() {
    return <div>index</div>;
  }
}

export function fetchData(resolve: (data: Data) => void) {
  resolve({});
}
