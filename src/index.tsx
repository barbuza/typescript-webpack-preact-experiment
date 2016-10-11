import * as preact from 'preact';
import { createStore } from './lib/store';
import Provider from './lib/Provider';

import reducer from './reducers/index';
import Root from './Root';

const store = createStore(reducer, {
  auth: {
    authenticated: false
  }
});

preact.render(<Provider store={store} component={Root} />, document.body);
