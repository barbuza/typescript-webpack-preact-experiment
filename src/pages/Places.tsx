import * as React from 'react';
import { Component } from '../components/Component';

export interface IArgs {
}

export interface IData {
}

export class Places extends Component<IArgs & IData, {}> {
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

export function fetchData(): Promise<IData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, 1000);
  });
}
