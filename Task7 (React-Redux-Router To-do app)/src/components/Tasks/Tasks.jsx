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
      ? this.props.items.map((item, index) => {
        return <li key={item.id + index}><Task item={item} /></li>;
      })
      : <p className='todo-message'>Let's create new task</p>;

    if (!this.props.category.length) {
      this.props.push('/main');
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
  const currUri = new URI(window.location.pathname + window.location.search);
  const searchObj = { ...currUri.search(true) };
  console.log(searchObj);

  if (!searchObj.checked) {
    return {
      items: state.itemReducer
        .filter(task => task.categoryId === ownProps.match.params.id)
        .filter(task => task.done === false),
      category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id)
    };
  }
  return {
    items: state.itemReducer
      .filter(task => task.categoryId === ownProps.match.params.id),
    category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
