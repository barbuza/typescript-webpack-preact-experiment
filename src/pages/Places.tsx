import * as React from 'react';
import { Component } from '../components/Component';

export class Places extends Component<{}, {}> {
  public render() {
    return (
      <ul>
        <li>Place 1</li>
        <li>Place 2</li>
        <li>Place 3</li>
      </ul>
    );
  }
}
