import './EditWindow.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Button, Input, Checkbox } from '../primitives';
import { checkTodo, editTodoItem } from '../../store/Tasks';

class EditWindow extends Component {
  state = {
    inputTaskValue: this.props.currentItem.name,
    textAreaValue: this.props.currentItem.description
  };

  handleInputTask = (event) => {
    const { value } = event.target;
    this.setState({
      inputTaskValue: value
    });
  }

  handleTextArea = (event) => {
    const { value } = event.target;
    this.setState({
      textAreaValue: value
    });
  }

  handleCheck = () => {
    const { currentItem: item, checkTodo } = this.props;
    checkTodo(item.id);
  }

  handleSaveChanges = () => {
    const { currentItem: item, editTodoItem, push } = this.props;
    const { inputTaskValue, textAreaValue } = this.state;

    if (inputTaskValue && textAreaValue) {
      editTodoItem(inputTaskValue, item.id, textAreaValue);
    }
    push(`/main/${item.categoryId}`);
  }

  handleCanselEdit = () => {
    const { currentItem: item, push } = this.props;
    push(`/main/${item.categoryId}`);
  }

  render() {
    const { currentItem: item } = this.props;

    return (
      <article className='edit__window'>
        <section className='edit__control-buttons'>
          <Button
            id='saveButtonEdit'
            text='Save changes'
            className='button--with-border'
            onClick={this.handleSaveChanges}
          />
          <Button
            onClick={this.handleCanselEdit}
            id='cancelButtonEdit'
            text='Cancel'
            className='button--with-border'
          />
        </section>
        <Input
          className='edit__input'
          value={this.state.inputTaskValue}
          onChange={this.handleInputTask}
        />
        <section className='edit__checkbox'>
          <label>
            <Checkbox
              onChange={this.handleCheck}
              id='doneTasks'
              className='checkbox'
              done={item.done}
            />
            Show done
          </label>
        </section>
        <textarea
          onChange={this.handleTextArea}
          className='edit__text-area'
          value={this.state.textAreaValue}
        />
      </article>
    );
  }
}

EditWindow.propTypes = {
  currentItem: PropTypes.object,
  checkTodo: PropTypes.func,
  push: PropTypes.func,
  editTodoItem: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentItem: state.itemReducer.filter(item => item.id === ownProps.id)[0]
  };
};

const mapDispatchToProps = {
  checkTodo,
  editTodoItem,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWindow);
