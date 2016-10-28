import Component from '../lib/Component';
import Header from './Header';
import Routes from './Routes';

export default class Root extends Component<{}, {}> {

  render() {
    return (
      <main>
        <Header />
        <Routes />
      </main>
    );
  }
}
