import { connect } from 'mobx-preact';
import Component from '../components/Component';

export interface Args {
  id: string;
}

export interface Data {
  spam: string;
}

@connect
export default class Bar extends Component<Args & Data, {}> {
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

export function fetchData(args: Args, callback: (data: Data) => void) {
  setTimeout(() => {
    callback({ spam: `spam-${args.id}` });
  }, 1000);
}
