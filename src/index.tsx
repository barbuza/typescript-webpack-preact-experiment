/* tslint:disable:no-console */

import { render } from 'preact';
import { Provider } from 'mobx-preact-alt';
import { createBrowserHistory } from 'history';
import { when } from 'mobx';
import { Store } from './stores';
import { RoutingState } from './stores/routing';
import { IAction } from './actions';
import { Root } from './components/Root';

const history = createBrowserHistory();
const store = new Store(history.location.pathname);

history.listen(location => {
  store.routing.path = location.pathname;
});

function emit<T>(action: IAction<T>): T {
  console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
  return action.react(store);
}

when(() => store.routing.state === RoutingState.READY, () => {
  const prealoder = document.getElementById('preloader');
  if (prealoder) {
    prealoder.parentNode.removeChild(prealoder);
  }

  render(
    <Provider store={store} history={history} emit={emit}>
      <Root />
    </Provider>,
    document.body
  );
});
