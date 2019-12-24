import './assets/styles/index.scss';
import React, { Component } from 'react';
import TodoPage from './pages/TodoPage';
import { Route, Switch, Redirect } from 'react-router';
import EditPage from './pages/EditPage';

export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path='/edit/:id/:item' component={EditPage} />
          <Route path='/main' component={TodoPage} />
          <Route path=''>
            <Redirect to='/main' />
          </Route>
        </Switch>
      </>
    );
  }
}
