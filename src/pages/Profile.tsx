import * as React from 'react';
import { Component } from '../components/Component';
import { observer } from 'mobx-react';
import { Store } from '../stores';

export interface IArgs {
}

export interface IData {
}

@observer
export class Profile extends Component<IArgs & IData, {}> {
  public render() {
    const { user } = this.store.auth;

    if (!user) {
      // this.history.replace('/');
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

export function fetchData(store: Store): Promise<IData> {
  if (!store.auth.authenticated) {
    store.history.replace('/');
  }

  return Promise.resolve({});
}
