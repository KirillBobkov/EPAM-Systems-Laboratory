import './TodoPage.scss';
import React from 'react';
import TodoList from '../../components/Tasks';
import Categories from '../../components/Categories';
import CategoryAdd from '../../components/Categories/CategoryAdd';
import TaskAdd from '../../components/Tasks/TaskAdd';
import ProgressBar, { NoMatch } from '../../components/primitives';
import Navigation from '../../components/Navigation';
import { Route, Switch } from 'react-router';

export default function TodoPage() {
  return (
    <div className='page'>
      <header>
        <Navigation />
        <ProgressBar />
        <section className='main__toolbar'>
          <CategoryAdd />
          <TaskAdd />
        </section>
      </header>
      <main className='content'>
        <aside className='categories-container'>
          <Categories />
        </aside>
        <Switch>
          <Route path='/main/:id' component={TodoList} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
}
