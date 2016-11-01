import { connect } from 'mobx-preact-alt';
import Component from './Component';
import Header from './Header';
import PagePreloader from './PagePreloader';

@connect
class Content extends Component<{}, {}> {
  render() {
    if (this.store.routing.route) {
      return this.store.routing.route;
    }
    return <div class={styles.loading}><PagePreloader/></div>;
  }
}

export default class Root extends Component<{}, {}> {

  render() {
    return (
      <main class={styles.root}>
        <Header />
        <div class={styles.content}>
          <Content />
        </div>
      </main>
    );
  }
}
