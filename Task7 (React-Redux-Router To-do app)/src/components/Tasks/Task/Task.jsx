import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../primitives';
import './Task.scss';
import { connect } from 'react-redux';
import { checkTodo } from '../../../store/Tasks/actions';
// import { Route } from 'react-router';
import { push } from 'connected-react-router';
// import { Link } from 'react-router-dom';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleCheck() {
    const { item } = this.props;
    this.props.checkTodo(item.id);
  }

  handleClick() {
    const { item } = this.props;
    console.log(this.props);
    this.props.push(`/${item.categoryId}/edit`);
  }

  render() {
    const { item } = this.props;
    return (
      <div className='todo-item-container'>
        <div>
          <label>
            <Checkbox onChange={this.handleCheck} className='checkbox checkbox--margin' id={item.id} done={item.done} />
            <span className='todo-item-name'>{item.name}</span>
          </label>
        </div>
        <Button onClick={this.handleClick} className='fas fa-edit' />
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
