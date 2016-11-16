import * as React from 'react';
import { Component } from '../components/Component';
import { delay } from '../utils';

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

export async function fetchData(): Promise<IData> {
  await delay(1000);
  return {};
}
