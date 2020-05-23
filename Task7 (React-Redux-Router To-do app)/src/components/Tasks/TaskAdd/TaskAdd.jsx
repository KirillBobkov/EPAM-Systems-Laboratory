import React, { Component } from 'react';
import './TaskAdd.scss';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import { addTodoItem } from '../../../store/Tasks/actions';
import { connect } from 'react-redux';

class TaskAdd extends Component {
  state = {
    inputTodoValue: ''
  };

  handleAddTodo = () => {
    const { category, addTodoItem } = this.props;
    const { inputTodoValue } = this.state;

    if (inputTodoValue) {
      addTodoItem(inputTodoValue, category.id);
      this.setState({
        inputTodoValue: ''
      });
    }
  }

  handleInputTodo = (event) => {
    const { value } = event.target;
    this.setState({
      inputTodoValue: value
    });
  }

  render () {
    const { category } = this.props;
    const disableValue = !category;

    return (
      <div className='todo-add'>
        <Input
          type='text'
          onChange={this.handleInputTodo}
          placeholder='Enter to-do name'
          value={this.state.inputTodoValue}
          disabled={disableValue}
        />
        <Button
          text='Add'
          onClick={this.handleAddTodo}
          className='button--with-border'
        />
      </div>
    );
  }
}

TaskAdd.propTypes = {
  addTodoItem: PropTypes.func,
  category: PropTypes.object
};

const mapStateToProps = (state) => {
  const { location } = state.router;
  const path = location.pathname.split('/');
  return {
    category: state.categoryReducer.filter(category => category.id === path[path.length - 1])[0]
  };
};

const mapDispatchToProps = {
  addTodoItem
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);
