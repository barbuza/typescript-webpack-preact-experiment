import * as preact from 'preact';
import { Provider } from 'mobx-preact';
import { createBrowserHistory } from 'history';

import { Action, RoutingAction } from './actions';
import Store from './stores';
import Root from './components/Root';

const store = new Store();

const history = createBrowserHistory();

store.routing.path = history.location.pathname;

history.listen(location => {
    emit(new RoutingAction(location.pathname));
});

function emit<T>(action: Action<T>): T {
    console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
    return action.react(store);
}

preact.render(
    <Provider store={store} history={history} emit={emit}>
        <Root />
    </Provider>,
    document.body
);
