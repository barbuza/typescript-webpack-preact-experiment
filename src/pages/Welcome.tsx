import * as React from 'react';
import { Component } from '../components/Component';

export class Welcome extends Component<{}, {}> {
  public render() {
    return <div>Welcome, guest!</div>;
  }
}
