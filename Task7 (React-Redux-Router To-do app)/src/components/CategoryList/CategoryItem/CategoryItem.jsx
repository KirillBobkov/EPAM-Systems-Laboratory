import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.scss';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../store/CategoryList/actions';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteCategory(this.props.category.id);
  }

  render() {
    const { category } = this.props;
    const classArr = ['category-item'];

    return (
      <div className={classArr.join(' ')} id={category.id}>
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
  deleteCategory: PropTypes.func
};

const mapDispatchToProps = {
  deleteCategory
};

export default connect(
  null,
  mapDispatchToProps
)(CategoryItem);
