import React, { Component } from 'react';
import '../assets/styles/index.scss';
import TodoPage from './pages/TodoPage';
import { Route, Switch } from 'react-router';
import EditPage from './pages/EditPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/:id/edit' component={EditPage} />
          <Route path='/' component={TodoPage} />
        </Switch>
      </div>
    );
  }
}
