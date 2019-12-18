import './Tasks.scss';
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import Task from './Task';
import TaskAdd from './TaskAdd';
import { connect } from 'react-redux';
import URI from 'urijs';

class Tasks extends Component {
  render() {
    const todoElements = (this.props.items.length)
      ? this.props.items.map(item => <li key={item.id}><Task item={item} /></li>)
      : <p className='todo-message'>Let's create new task</p>;

    !this.props.category.length && this.props.push('/main');

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
  const currentURI = new URI(window.location.pathname + window.location.search);
  const searchParameters = { ...currentURI.search(true) };

  return {
    items: state.itemReducer
      .filter(task => task.categoryId === ownProps.match.params.id)
      .filter(task => searchParameters.checked ? true : task.done === false)
      .filter(task => searchParameters.searchTo
        ? task.name.toLowerCase().includes(searchParameters.searchTo.toLowerCase())
        : true),
    category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
