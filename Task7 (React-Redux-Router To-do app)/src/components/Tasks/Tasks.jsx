import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import TaskAdd from './TaskAdd';
import './Tasks.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class Tasks extends Component {
  render() {
    const todoElements = (this.props.items.length)
      ? this.props.items.map((item, index) => {
        return <li key={item.id + index}><Task item={item} /></li>;
      })
      : <p className='todo-message'>Let's create new task</p>;

    if (!this.props.category.length) {
      this.props.push('/');
    }

    return (
      <div className='todo-list-container'>
        <TaskAdd />
        <ul className='todo-list'>
          {todoElements}
        </ul>
      </div>
    );
  }
}

Tasks.propTypes = {
  items: PropTypes.array,
  push: PropTypes.func,
  category: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.itemReducer.filter(task => task.categoryId === ownProps.match.params.id),
    category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
