import React, { Component } from 'react';
import './TaskAdd.scss';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import { addTodoItem } from '../../../store/Tasks/actions';
import { connect } from 'react-redux';

class TaskAdd extends Component {
  constructor(props) {
    super(props);
    this.handleInputTodo = this.handleInputTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.state = {
      inputTodoValue: ''
    };
  }

  handleAddTodo() {
    const { categoryId } = this.props;
    const { inputTodoValue } = this.state;

    if (inputTodoValue) {
      this.props.addTodoItem(inputTodoValue, categoryId);
      this.setState({
        inputTodoValue: ''
      });
    }
  }

  handleInputTodo(event) {
    const { value } = event.target;
    this.setState({
      inputTodoValue: value
    });
  }

  render () {
    return (
      <div className='todo-add'>
        <Input
          type='text'
          onChange={this.handleInputTodo}
          placeholder='Enter to-do name'
          value={this.state.inputTodoValue}
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
  categoryId: PropTypes.string
};

const mapStateToProps = (state) => {
  const { location } = state.router;
  const currentCategory = location.pathname.split('/');
  return {
    categoryId: currentCategory[currentCategory.length - 1]
  };
};

const mapDispatchToProps = {
  addTodoItem
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);
