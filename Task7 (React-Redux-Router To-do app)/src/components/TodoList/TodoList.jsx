import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';
import './TodoList.scss';
import { connect } from 'react-redux';
// import { useParams } from 'react-router';

class TodoList extends Component {
  render() {
    const todoElements = this.props.state.length
      ? this.props.state.map((item, index) => {
        return <li key={item.id + index}><TodoItem item={item} /></li>;
      })
      : <li>Let's create new task</li>;

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
  state: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.itemReducer.filter(task => task.categoryId === ownProps.match.params.id)
  };
};

export default connect(
  mapStateToProps
)(TodoList);
