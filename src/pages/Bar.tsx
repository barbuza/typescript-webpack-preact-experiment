import * as React from 'react';
import { Component } from '../components/Component';
import { JSONView } from '../components/JSONView';
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

export function fetchData(args: IArgs/*, store: Store*/): Promise<IData> {
  return new Promise(resolve => {
    setTimeout(() => {
      // store.emit(new LogoutAction());
      resolve({ spam: `spam-${args.id}` });
    }, 1000);
  });
}
