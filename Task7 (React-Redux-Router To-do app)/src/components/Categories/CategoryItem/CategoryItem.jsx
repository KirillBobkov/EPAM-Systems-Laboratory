import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.scss';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../store/Categories/actions';
import { deleteAllItemsOfThisCategory } from '../../../store/Tasks/actions';
import { push } from 'connected-react-router';
import URI from 'urijs';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChooseCategory = this.handleChooseCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
  }

  handleCreateCategory(event) {
    if (event.target.tagName === 'BUTTON') {
      event.stopPropagation();
      console.log(1);
    }
  }

  handleDelete(event) {
    if (event.target.tagName === 'BUTTON') {
      event.stopPropagation();
      this.props.push('/');
      this.props.deleteCategory(this.props.category.id);
      this.props.deleteAllItemsOfThisCategory(this.props.category.id);
    }
  }

  handleChooseCategory() {
    this.props.push(`/main/${this.props.category.id}`);
  }

  render() {
    const { category } = this.props;
    const currUri = new URI(window.location.pathname + window.location.search);
    const arr = currUri.path().split('/');
    const classCategory = (arr.includes(category.id)) ? 'category-item checked' : 'category-item';

    return (

      <div className={classCategory} onClick={this.handleChooseCategory} id={category.id}>
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
          <Button onClick={this.handleCreateCategory} className='fas fa-plus' />
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
