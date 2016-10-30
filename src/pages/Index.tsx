import Component from '../components/Component';
import { connect } from 'mobx-preact';

export interface Args {

}

export interface Data {

}

@connect
export default class Index extends Component<Args & Data, {}> {
  render() {
    return <div>index</div>;
  }
}

export function fetchData(_: Args, resolve: (data: Data) => void) {
  resolve({});
}
