import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';
import './TodoList.scss';
import { connect } from 'react-redux';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCategory: '243543698'
    };
  }

  render() {
    console.log(this.props);

    const todoElements = this.props.state.filter(element => element.categoryId).map((item, index) =>
      <li key={item.id + index}><TodoItem item={item} /></li>
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
  state: PropTypes.array
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps
)(TodoList);
