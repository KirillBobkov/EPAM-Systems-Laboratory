import './TodoPage.scss';
import React, { Component } from 'react';
import TodoList from '../../components/Tasks';
import Categories from '../../components/Categories';
import CategoryAdd from '../../components/Categories/CategoryAdd';
import TaskAdd from '../../components/Tasks/TaskAdd';
import { ProgressBar, NoMatch } from '../../components/primitives';
import Header from '../../components/Header';
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
            <Route exact path='/main/search' component={TodoList} />
            <Route path='/main/:id' component={TodoList} />
            <Route component={NoMatch} />
          </Switch>
        </section>
      </main>
    );
  }
}
