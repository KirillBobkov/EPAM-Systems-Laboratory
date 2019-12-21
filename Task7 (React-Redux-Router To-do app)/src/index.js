import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import createRootReducer from './store/rootReduser';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  undefined,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
