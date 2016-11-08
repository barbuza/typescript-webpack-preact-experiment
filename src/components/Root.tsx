import * as React from 'react';
import { observer } from 'mobx-react';
import { Component } from './Component';
import { Header } from './Header';
import { PagePreloader } from './PagePreloader';

@observer
class Content extends Component<{}, {}> {
  public render() {
    return this.store.routing.route || <div className={styles.loading}><PagePreloader /></div>;
  }
}

export class Root extends Component<{}, {}> {
  public render() {
    return (
      <main className={styles.root}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Content />
          </div>
        </div>
      </main>
    );
  }
}
