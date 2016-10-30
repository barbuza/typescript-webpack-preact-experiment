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
        <div>args:</div>
        <div className={styles.json}>{JSON.stringify({ id: this.props.id })}</div>
        <div>data:</div>
        <div className={styles.json}>{JSON.stringify({ spam: this.props.spam })}</div>
      </div>
    );
  }
}

export function fetchData(args: IArgs, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ spam: `eggs-${args.id}` });
  }, 1000);
}
