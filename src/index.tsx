import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { when } from 'mobx';
import { Store, ISerialized } from './stores';
import { Root } from './components/Root';
import { routes } from './routes';

/* tslint:disable */
declare namespace window {
  const _store: ISerialized;
}
/* tslint:enable */

const history = createBrowserHistory();
const store = new Store(window._store, {
  path: history.location.pathname,
  routes,
  history,
});

when(() => store.routing.isReady, () => {
  const prealoder = document.getElementById('preloader');
  if (prealoder && prealoder.parentNode) {
    prealoder.parentNode.removeChild(prealoder);
  }

  render(
    <Provider store={store} history={history}>
      <Root />
    </Provider>,
    document.getElementById('app')
  );
});

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').Root;

    render(
      <Provider store={store} history={history}>
        <NextRoot />
      </Provider>,
      document.getElementById('app')
    );
  });

  module.hot.accept('./routes', () => {
    store.routing.routes = require('./routes').routes;
  });
}
