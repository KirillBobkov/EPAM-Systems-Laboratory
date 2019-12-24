import './Task.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../primitives';
import { connect } from 'react-redux';
import { checkTodo } from '../../../store/Tasks/actions';
import { push } from 'connected-react-router';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleCheck() {
    const { item, checkTodo } = this.props;
    checkTodo(item.id);
  }

  handleClick() {
    const { item, push } = this.props;
    push(`/edit/${item.categoryId}/${item.id}`);
  }

  render() {
    const { item } = this.props;
    return (
      <div className='todo-item-container'>
        <div>
          <label>
            <Checkbox
              onChange={this.handleCheck}
              className='checkbox checkbox--margin'
              id={item.id}
              done={item.done}
            />
            <span
              className={item.done
                ? 'todo-item-name done'
                : 'todo-item-name'}
            >
              {item.name}
            </span>
          </label>
        </div>
        <Button
          onClick={this.handleClick}
          className='fas fa-edit'
        />
      </div>
    );
  }
}

TodoItem.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object,
  checkTodo: PropTypes.func,
  push: PropTypes.func
};

const mapDispatchToProps = {
  checkTodo, push
};

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
