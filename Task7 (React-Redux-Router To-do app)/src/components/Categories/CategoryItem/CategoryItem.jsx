import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.scss';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../store/Categories/actions';
import { deleteAllItemsOfThisCategory } from '../../../store/Tasks/actions';
import { push } from 'connected-react-router';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDelete(event) {
    if (event.target.tagName === 'BUTTON') {
      event.stopPropagation();
      this.props.push('/');
      this.props.deleteCategory(this.props.category.id);
      this.props.deleteAllItemsOfThisCategory(this.props.category.id);
    }
  }

  handleClick() {
    this.props.push(`/${this.props.category.id}`);
  }

  render() {
    const { category } = this.props;
    return (

      <div className='category-item' onClick={this.handleClick} id={category.id}>
        <div>
          <Button className='fas fa-chevron-left' />
          <span className='category-name'>{category.name}</span>
          <Button className='fas fa-edit' />
        </div>
        <div>
          <Button
            className='fas fa-trash-alt'
            onClick={this.handleDelete}
          />
          <Button className='fas fa-plus' />
        </div>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string,
  deleteCategory: PropTypes.func,
  deleteAllItemsOfThisCategory: PropTypes.func,
  push: PropTypes.func
};

const mapDispatchToProps = {
  deleteCategory,
  deleteAllItemsOfThisCategory,
  push
};

export default connect(state => ({}), mapDispatchToProps)(CategoryItem);
