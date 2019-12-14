import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.scss';
import { connect } from 'react-redux';
import { deleteCategory, checkCategory } from '../../../store/CategoryList/actions';
import { deleteAllItemsOfThisCategory } from '../../../store/TodoList/actions';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDelete(event) {
    if (event.target.tagName === 'BUTTON') {
      this.props.deleteCategory(this.props.category.id);
      this.props.deleteAllItemsOfThisCategory(this.props.category.id);
    }
  }

  handleClick() {
    const { category } = this.props;
    this.props.checkCategory(category.id);
  }

  render() {
    const { category } = this.props;
    console.log(category.checked);
    // const classes = category.checked ? 'category-item red' : 'category-item';

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
  checkCategory: PropTypes.func,
  deleteAllItemsOfThisCategory: PropTypes.func
};

const mapDispatchToProps = {
  deleteCategory, checkCategory, deleteAllItemsOfThisCategory
};

export default connect(
  state => ({
    state
  }),
  mapDispatchToProps
)(CategoryItem);
