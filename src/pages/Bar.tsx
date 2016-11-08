import * as React from 'react';
import { Component } from '../components/Component';
import { JSONView } from '../components/JSONView';

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

export function fetchData(args: IArgs, callback: (data: IData) => void) {
  setTimeout(() => {
    callback({ spam: `spam-${args.id}` });
  }, 1000);
}
