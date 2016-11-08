import * as React from 'react';
import { Component } from './Component';

export class JSONView extends Component<{ data: any }, {}> {
  public render() {
    return (
      <div className={styles.root}>
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}
