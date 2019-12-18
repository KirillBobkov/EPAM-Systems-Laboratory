import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import './CategoryItem.scss';
import { connect } from 'react-redux';
import { deleteCategory, editCategoryItem } from '../../../store/Categories/actions';
import { deleteAllItemsOfThisCategory } from '../../../store/Tasks/actions';
import { push } from 'connected-react-router';
import URI from 'urijs';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChooseCategory = this.handleChooseCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleSaveCategoryName = this.handleSaveCategoryName.bind(this);
    this.handleCancelChangingNameOfCategory = this.handleCancelChangingNameOfCategory.bind(this);
    this.state = {
      editMode: false,
      nameCategory: this.props.category.name
    };
  }

  handleCreateCategory(event) {
    event.stopPropagation();
  }

  handleInputCategory(event) {
    const { value } = event.target;
    this.setState({
      nameCategory: value
    });
  }

  handleEditCategory(event) {
    event.stopPropagation();
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleCancelChangingNameOfCategory() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleSaveCategoryName() {
    const { category } = this.props;
    if (this.state.nameCategory) {
      this.props.editCategoryItem(this.state.nameCategory, category.id);
    }
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleDelete(event) {
    event.stopPropagation();
    const currenURI = new URI(window.location.search);
    const searchParameters = { ...currenURI.search(true) };

    this.props.push(`/main/${currenURI.search(searchParameters).toString()}`);
    this.props.deleteCategory(this.props.category.id);
    this.props.deleteAllItemsOfThisCategory(this.props.category.id);
  }

  handleChooseCategory() {
    const currenURI = new URI(window.location.search);
    const searchParameters = { ...currenURI.search(true) };
    this.props.push(`/main/${this.props.category.id + currenURI.search(searchParameters).toString()}`);
  }

  renderEditMode() {
    const { category } = this.props;
    return (
      <div className='category-item checked' id={category.id}>
        <div>
          <Input
            onChange={this.handleInputCategory}
            value={this.state.nameCategory}
          />
        </div>
        <div>
          <Button
            className='fas fa-check-circle'
            onClick={this.handleSaveCategoryName}
          />
          <Button
            className='fas fa-times-circle'
            onClick={this.handleCancelChangingNameOfCategory}
          />
        </div>
      </div>
    );
  }

  renderViewMode() {
    const { category } = this.props;
    const currenURI = new URI(window.location.pathname + window.location.search);
    const arr = currenURI.path().split('/');
    const classCategory = (arr.includes(category.id)) ? 'category-item checked' : 'category-item';

    return (
      <div className={classCategory} onClick={this.handleChooseCategory} id={category.id}>
        <div>
          <Button className='fas fa-chevron-left' />
          <span className='category-name'>{category.name}</span>
          <Button className='fas fa-edit' onClick={this.handleEditCategory} />
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

  render() {
    if (this.state.editMode) {
      return this.renderEditMode();
    }
    return this.renderViewMode();
  }
}

CategoryItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string,
  deleteCategory: PropTypes.func,
  deleteAllItemsOfThisCategory: PropTypes.func,
  push: PropTypes.func,
  editCategoryItem: PropTypes.func
};

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = {
  deleteCategory,
  deleteAllItemsOfThisCategory,
  editCategoryItem,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
