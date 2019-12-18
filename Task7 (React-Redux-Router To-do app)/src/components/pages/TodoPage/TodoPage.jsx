import './TodoPage.scss';
import React, { Component } from 'react';
import TodoList from '../../Tasks';
import Categories from '../../Categories';
import { ProgressBar, NoMatch } from '../../primitives';
import Header from '../../Header';
import { Route, Switch } from 'react-router';

export default class TodoPage extends Component {
  render() {
    return (
      <>
        <main className='main'>
          <Header />
          <ProgressBar />
          <div className='content'>
            <Categories />
            <Switch>
              <Route exact path='/main/:id' component={TodoList} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </main>
      </>
    );
  }
}
