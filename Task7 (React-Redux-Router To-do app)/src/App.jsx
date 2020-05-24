import './assets/styles/index.scss';
import React, { Component } from 'react';
import TodoPage from './pages/TodoPage';
import { Route, Switch, Redirect } from 'react-router';
import EditPage from './pages/EditPage';
import { LangContext, lang } from './lang-context/lang-context';

export default class App extends Component {
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
      <LangContext.Provider value={this.state}>
        <Switch>
          <Route path='/edit/:id/:item' component={EditPage} />
          <Route path='/main' component={TodoPage} />
          <Route path=''>
            <Redirect to='/main' />
          </Route>
        </Switch>
      </LangContext.Provider>
    );
  }
}
