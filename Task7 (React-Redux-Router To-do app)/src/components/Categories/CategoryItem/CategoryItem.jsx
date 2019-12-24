import './CategoryItem.scss';
import URI from 'urijs';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '../../primitives';
import Categories from '../../Categories';
import { connect } from 'react-redux';
import { deleteCategory, editCategoryItem, addSubCategory } from '../../../store/Categories/actions';
import { deleteAllItemsOfThisCategory } from '../../../store/Tasks/actions';
import { push } from 'connected-react-router';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      hideMode: true,
      nameCategory: this.props.category.name
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleChooseCategory = this.handleChooseCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.handleSaveCategoryName = this.handleSaveCategoryName.bind(this);
    this.handleHideSubCategories = this.handleHideSubCategories.bind(this);
    this.handleCancelChangingNameOfCategory = this.handleCancelChangingNameOfCategory.bind(this);
  }

  handleHideSubCategories(event) {
    event.stopPropagation();
    this.setState({
      hideMode: !this.state.hideMode
    });
  }

  handleCreateCategory(event) {
    event.stopPropagation();
    const { id, name } = this.props.category;
    this.props.addSubCategory(id, name);
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
    const { category, editCategoryItem } = this.props;
    const { editMode, nameCategory } = this.state;
    if (nameCategory) {
      editCategoryItem(nameCategory, category.id);
      this.setState({
        editMode: !editMode
      });
    }
  }

  handleDelete(event) {
    event.stopPropagation();
    const { location, category, push, deleteCategory, deleteAllItemsOfThisCategory } = this.props;
    const currenURI = new URI(location.search);
    const searchParameters = { ...currenURI.search(true) };

    deleteCategory(category.id, category.parentId);
    deleteAllItemsOfThisCategory(category.id);
    push(`/main${currenURI.search(searchParameters).toString()}`);
  }

  handleChooseCategory() {
    const { location, push, category } = this.props;
    const currenURI = new URI(location.search);
    const searchParameters = { ...currenURI.search(true) };
    push(`/main/${category.id + currenURI.search(searchParameters).toString()}`);
  }

  renderEditMode() {
    const { category } = this.props;
    const { nameCategory, hideMode } = this.state;
    const subCategories = hideMode
      ? <Categories child parentId={category.id} />
      : <span />;

    return (
      <>
        <div
          className='category-item checked'
          id={category.id}
        >
          <Input
            onChange={this.handleInputCategory}
            value={nameCategory}
          />
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
        {subCategories}
      </>
    );
  }

  renderViewMode() {
    const { category, location, categoriesHaveSub } = this.props;
    const classCategory = (location.pathname.includes(category.id))
      ? 'category-item checked'
      : 'category-item';
    const subCategories = this.state.hideMode
      ? <Categories
        child
        parentId={category.id}
        // eslint-disable-next-line indent
        />
      : <span />;
    const classButtonHide = this.state.hideMode
      ? 'fas fa-chevron-up'
      : 'fas fa-chevron-down';

    return (
      <>
        <div
          className={classCategory}
          onClick={this.handleChooseCategory}
          id={category.id}
        >
          <div>
            {categoriesHaveSub.length > 0
              ? <Button
                onClick={this.handleHideSubCategories}
                className={classButtonHide}
                // eslint-disable-next-line indent
                />
              : <span />}
            <span className='category-name'>
              {category.name}
            </span>
            <Button
              className='fas fa-edit'
              onClick={this.handleEditCategory}
            />
          </div>
          <div>
            <Button
              className='fas fa-trash-alt'
              onClick={this.handleDelete}
            />
            <Button
              onClick={this.handleCreateCategory}
              className='fas fa-plus'
            />
          </div>
        </div>
        {subCategories}
      </>);
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
  location: PropTypes.object,
  name: PropTypes.string,
  deleteCategory: PropTypes.func,
  deleteAllItemsOfThisCategory: PropTypes.func,
  push: PropTypes.func,
  editCategoryItem: PropTypes.func,
  addSubCategory: PropTypes.func,
  categoriesHaveSub: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  location: state.router.location,
  categoriesHaveSub: state.categoryReducer.filter(category => category.parentId === ownProps.category.id)
});

const mapDispatchToProps = {
  deleteCategory,
  deleteAllItemsOfThisCategory,
  editCategoryItem,
  addSubCategory,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
