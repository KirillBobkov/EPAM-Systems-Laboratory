/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TodoList from '../../Tasks';
import Categories from '../../Categories';
import { ProgressBar, NoMatch } from '../../primitives';
import Header from '../../Header';
import './TodoPage.scss';
import { Route, Switch } from 'react-router';

export default class TodoPage extends Component {
  render() {
    return (
      <>
        <Header />
        <main className='main'>
          <ProgressBar />
          <div className='content'>
            <Categories />
            <Switch>
              <Route exact path='/:id' component={TodoList} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </main>
      </>
    );
  }
}
