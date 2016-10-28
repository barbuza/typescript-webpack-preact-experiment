import { connect } from 'mobx-preact';
import Component from '../lib/Component';

interface IData {
  spam: string;
}

@connect
export default class Bar extends Component<{ id: string } & IData, {}> {
  render() {
    return (
      <div>
        <div>bar, id = {this.props.id}, spam = {this.props.spam}</div>
        <div>user json = {JSON.stringify(this.store.auth.user)}</div>
      </div>
    );
  }
}

export function fetchData(_: any, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ spam: 'eggs' });
  }, 1000);
}
