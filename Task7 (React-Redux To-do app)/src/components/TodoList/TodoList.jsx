import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { TodoAdd } from './TodoAdd';
import './TodoList.scss';
import { connect } from 'react-redux';

class TodoList extends Component {
  render() {
    const todoElements = this.props.state.map((item) =>
      <li key={item.id}><TodoItem item={item} /></li>
    );

    return (
      <div className='todo-list-container'>
        <TodoAdd />
        <ul className='todo-list'>
          {todoElements}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  state: PropTypes.object
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps
)(TodoList);
