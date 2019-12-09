import React, { Component } from 'react';
import '../assets/styles/index.scss';
import { TodoPage } from './pages/TodoPage';

export class App extends Component {
  render() {
    return (
      <div>
        <TodoPage />
      </div>
    );
  }
}
