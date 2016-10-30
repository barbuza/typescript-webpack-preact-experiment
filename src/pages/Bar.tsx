import { connect } from 'mobx-preact';
import Component from '../components/Component';

interface IArgs {
  id: string;
}

interface IData {
  spam: string;
}

@connect
export default class Bar extends Component<IArgs & IData, {}> {
  render() {
    return (
      <div>
        <div>bar, id = {this.props.id}, spam = {this.props.spam}</div>
        <div>user json = {JSON.stringify(this.store.auth.user)}</div>
      </div>
    );
  }
}

export function fetchData(args: IArgs, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ spam: `eggs-${args.id}` });
  }, 1000);
}
