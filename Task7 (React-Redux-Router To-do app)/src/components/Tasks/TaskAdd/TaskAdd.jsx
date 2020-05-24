import React, { Component } from 'react';
import './TaskAdd.scss';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import { addTodoItem } from '../../../store/Tasks/actions';
import { connect } from 'react-redux';
import { LangContext } from '../../../lang-context/lang-context';

class TaskAdd extends Component {
  static contextType = LangContext;

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

    const { lang } = this.context;

    return (
      <div className='todo-add'>
        <Input
          className='todo-input'
          type='text'
          onChange={this.handleInputTodo}
          placeholder={lang.taskInputPlaceholder}
          value={this.state.inputTodoValue}
          disabled={disableValue}
        />
        <Button
          text={lang.add}
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
