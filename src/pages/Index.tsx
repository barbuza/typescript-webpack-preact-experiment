import Component from '../components/Component';
import { connect } from 'mobx-preact';

interface IData {
  foo: string;
}

@connect
export default class Index extends Component<{} & IData, {}> {
  render() {
    return <div>index, foo = {this.props.foo}</div>;
  }
}

export function fetchData(_: any, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ foo: 'bar' });
  }, 1000);
}
