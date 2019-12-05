/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { TodoList } from '../../TodoList';
import { CategoryList } from '../../CategoryList';
import { ProgressBar } from '../../primitives';
import { Toolbar } from '../../Toolbar';
import './TodoPage.scss';

const items = require('../../../items.json');
const categories = require('../../../categories.json');

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

export class TodoPage extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header />
        <Layout.Body />
      </Layout>
    );
  }
}
