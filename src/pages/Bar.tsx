import * as React from 'react';
import { Component } from '../components/Component';
import { JSONView } from '../components/JSONView';
import { delay } from '../utils';
// import { Store } from '../stores';
// import { LogoutAction } from '../actions';

export interface IArgs {
  id: string;
}

export interface IData {
  spam: string;
}

export class Bar extends Component<IArgs & IData, {}> {
  public render() {
    return (
      <div>
        <div>args:</div>
        <JSONView data={{ id: this.props.id }}/>
        <div>data:</div>
        <JSONView data={{ spam: this.props.spam }}/>
      </div>
    );
  }
}

export async function fetchData(args: IArgs/*, store: Store*/): Promise<IData> {
  await delay(1000);
  return { spam: `spam-${args.id}` };
}
