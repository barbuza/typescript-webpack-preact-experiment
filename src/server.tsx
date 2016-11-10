/* tslint:disable:no-console */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';
import { when } from 'mobx';
import { Store } from './stores';
import { RoutingState } from './stores/routing';
import { IAction } from './actions';
import { Root } from './components/Root';
import { routes } from './serverRoutes';

export function renderPage(pathname: string): Promise<string> {
  const store = new Store(pathname, routes);

  function emit<T>(action: IAction<T>): T {
    console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
    return action.react(store);
  }

  return new Promise((resolve: (result: string) => void) => {
    when(() => store.routing.state === RoutingState.READY, () => {
      resolve(
        renderToString(
          <Provider store={store} emit={emit}>
            <Root />
          </Provider>
        )
      );
    });
  });

}
