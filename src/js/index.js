//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import   React         from 'react';
import { render }      from 'react-dom';
import { createStore } from 'redux';
import { Provider }    from 'react-redux';
import   App           from './app.js';
import   reducer       from './reducer';

//import 'bootstrap';

//-----------------------------------------------------------------------------//

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

//-----------------------------------------------------------------------------//