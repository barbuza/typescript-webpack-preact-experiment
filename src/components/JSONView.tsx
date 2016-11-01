import { Component } from './Component';

export class JSONView extends Component<{ data: any }, {}> {
  public render() {
    return (
      <div class={styles.root}>
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}
