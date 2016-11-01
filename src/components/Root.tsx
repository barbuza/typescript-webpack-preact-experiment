import { connect } from 'mobx-preact-alt';
import { Component } from './Component';
import { Header } from './Header';
import { PagePreloader } from './PagePreloader';

@connect
class Content extends Component<{}, {}> {
  public render() {
    return this.store.routing.route || <div class={styles.loading}><PagePreloader /></div>;
  }
}

export class Root extends Component<{}, {}> {
  public render() {
    return (
      <main class={styles.root}>
        <Header />
        <div class={styles.contentWrapper}>
          <div class={styles.content}>
            <Content />
          </div>
        </div>
      </main>
    );
  }
}
