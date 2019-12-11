import React, { Component } from 'react';
import './TodoAdd.scss';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import { addTodoItem } from '../../../store/CategoryList/actions';
import { connect } from 'react-redux';

class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.handleInputTodo = this.handleInputTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.state = {
      inputTodoValue: ''
    };
  }

  handleAddTodo() {
    if (this.state.inputTodoValue) {
      this.props.addTodoItem(this.state.inputTodoValue);
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

TodoAdd.propTypes = {
  addTodoItem: PropTypes.func
};

const mapDispatchToProps = {
  addTodoItem
};

export default connect(
  null,
  mapDispatchToProps
)(TodoAdd);
