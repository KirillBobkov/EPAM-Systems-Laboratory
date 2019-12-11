import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../primitives';
import './TodoItem.scss';
import { connect } from 'react-redux';
import { checkTodo } from '../../../store/CategoryList/actions';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    const { item } = this.props;
    this.props.checkTodo(item.id);
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
        <Button className='fas fa-edit' />
      </div>
    );
  }
}

TodoItem.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object,
  checkTodo: PropTypes.func
};

const mapDispatchToProps = {
  checkTodo
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
