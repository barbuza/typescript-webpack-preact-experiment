import * as React from 'react';
import { Component } from '../components/Component';
import { observer } from 'mobx-react';

export interface IArgs {
}

export interface IData {
}

@observer
export class Profile extends Component<IArgs & IData, {}> {
  public render() {
    const { user } = this.store.auth;

    if (!user) {
      return null;
    }

    return (
      <div>
        <h2>Profile</h2>
        {user.name}<br />
        {user.email}
      </div>
    );
  }
}

export function fetchData(): Promise<IData> {
  return Promise.resolve({});
}
