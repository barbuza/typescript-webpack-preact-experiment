import Component from '../components/Component';

export interface IArgs {
  id: string;
}

export interface IData {
  spam: string;
}

export default class Bar extends Component<IArgs & IData, {}> {
  public render() {
    return (
      <div>
        <div>args:</div>
        <div class={styles.json}>{JSON.stringify({ id: this.props.id })}</div>
        <div>data:</div>
        <div class={styles.json}>{JSON.stringify({ spam: this.props.spam })}</div>
      </div>
    );
  }
}

export function fetchData(args: IArgs, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ spam: `spam-${args.id}` });
  }, 1000);
}
