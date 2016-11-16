import * as React from 'react';
import { Component } from '../components/Component';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Store } from '../stores';
import { Link } from '../components/Link';

export interface IArgs {
}

export interface IData {
}

@observer
export class Profile extends Component<IArgs & IData, {}> {

  @observable protected form = {
    name: (this.store.auth.user as IUser).name,
    email: (this.store.auth.user as IUser).email,
  };

  public render() {
    const { user } = this.store.auth;

    if (!user) {
      return null;
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <Link href="/profile/edit">Edit</Link>
        <hr />
        <div>
          <strong>Id</strong>: {user.id}
        </div>
        <div>
          <strong>Email</strong>: {user.email}
        </div>
      </div>
    );
  }
}

export function fetchData(store: Store): Promise<IData> {
  if (!store.auth.authenticated) {
    store.routing.redirect('/');
  }

  return Promise.resolve({});
}
