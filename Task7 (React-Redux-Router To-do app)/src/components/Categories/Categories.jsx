import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import './Categories.scss';
import { connect } from 'react-redux';

class Categories extends Component {
  render() {
    const { categories } = this.props;
    const classes = this.props.className ? 'category-list-container child' : 'category-list-container';
    const categoryElements = categories.map((category) =>
      <li key={category.id}>
        <CategoryItem category={category} />
      </li>
    );

    return (
      <div className={classes}>
        <ul className='category-list'>
          {categoryElements}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoryReducer.filter(category => ownProps.parentId
      ? category.parentId === ownProps.parentId
      : category.parentId === '')
  };
};

export default connect(mapStateToProps)(Categories);

Categories.propTypes = {
  categories: PropTypes.array,
  className: PropTypes.string
};
