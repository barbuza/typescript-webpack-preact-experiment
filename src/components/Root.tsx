import { connect } from 'mobx-preact';
import Component from './Component';
import Header from './Header';
import PagePreloader from './PagePreloader';

@connect
class Content extends Component<{}, {}> {
  render() {
    if (this.store.routing.route) {
      return this.store.routing.route;
    }
    return <div className={styles.loading}><PagePreloader/></div>;
  }
}

export default class Root extends Component<{}, {}> {

  render() {
    return (
      <main className={styles.root}>
        <Header />
        <div className={styles.content}>
          <Content />
        </div>
      </main>
    );
  }
}
