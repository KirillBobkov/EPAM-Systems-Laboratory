/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TodoList from '../../TodoList';
import CategoryList from '../../CategoryList';
import { ProgressBar } from '../../primitives';
import Header from '../../Header';
import './TodoPage.scss';
import { Route } from 'react-router-dom';

export default class TodoPage extends Component {
  render() {
    return (
      <>
        <Header />
        <main className='main'>
          <ProgressBar />
          <div className='content'>
            <CategoryList />
            <Route path='/:id' component={TodoList} />
          </div>
        </main>
      </>
    );
  }
}
