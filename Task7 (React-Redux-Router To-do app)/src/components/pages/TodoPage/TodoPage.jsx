import './TodoPage.scss';
import React, { Component } from 'react';
import TodoList from '../../Tasks';
import Categories from '../../Categories';
import CategoryAdd from '../../Categories/CategoryAdd';
import TaskAdd from '../../Tasks/TaskAdd';
import { ProgressBar, NoMatch } from '../../primitives';
import Header from '../../Header';
import { Route, Switch } from 'react-router';

export default class TodoPage extends Component {
  render() {
    return (
      <main className='main'>
        <Header />
        <ProgressBar />
        <section className='main__toolbar'>
          <CategoryAdd />
          <TaskAdd />
        </section>
        <section className='content'>
          <div className='categories-container'>
            <Categories />
          </div>
          <Switch>
            <Route path='/main/:id' component={TodoList} />
            <Route component={NoMatch} />
          </Switch>
        </section>
      </main>
    );
  }
}
