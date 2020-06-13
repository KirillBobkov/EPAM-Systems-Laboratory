import './assets/styles/index.scss';
import React, { Component } from 'react';
import TodoPage from './pages/TodoPage';
import { Route, Switch, Redirect } from 'react-router';
import EditPage from './pages/EditPage';
import { LangContext, lang } from './lang-context/lang-context';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import createRootReducer from './store/rootReduser';
import { composeWithDevTools } from 'redux-devtools-extension';

export default class App extends Component {
  history = createBrowserHistory();
  store = createStore(
    createRootReducer(this.history),
    undefined,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(this.history)
      )
    )
  );

  toggleLang = () => {
    this.setState(state => ({
      lang:
        state.lang === lang.ru
          ? lang.en
          : lang.ru
    }));
  };

  state = {
    lang: lang.ru,
    toggleLang: this.toggleLang
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <LangContext.Provider value={this.state}>
            <Switch>
              <Route path='/edit/:id/:item' component={EditPage} />
              <Route path='/main' component={TodoPage} />
              <Route path=''>
                <Redirect to='/main' />
              </Route>
            </Switch>
          </LangContext.Provider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
