/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { CategoryList } from './CategoryList';
import { ProgressBar } from './primitives/ProgressBar';
import { Toolbar } from './Toolbar';

import categories from '../categories';
import items from '../items';

import '../assets/styles/index.scss';
import './App.scss';

const Layout = props => {
  return (
    <div className='container'>
      {props.children}
    </div>
  );
};

const Body = () => {
  return (
    <main className='main'>
      <ProgressBar />
      <div className='content'>
        <CategoryList data={categories} />
        <TodoList data={items} />
      </div>
    </main>
  );
};

const Header = () => {
  return (
    <header className='header'>
      <h1 className='title'>To-do list</h1>
      <Toolbar />
    </header>
  );
};

Layout.Body = Body;
Layout.Header = Header;

class App extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header />
        <Layout.Body />
      </Layout>
    );
  }
}

export default App;
