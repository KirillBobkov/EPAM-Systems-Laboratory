import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import CategoryAdd from './CategoryAdd';
import './Categories.scss';
import { connect } from 'react-redux';

class Category extends Component {
  render() {
    const { categories } = this.props;

    const categoryElements = categories.map((category) =>
      <li key={category.id}>
        <CategoryItem category={category} />
      </li>
    );

    return (
      <div className='category-list-container'>
        <CategoryAdd />
        <ul className='category-list'>
          {categoryElements}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer
  };
};

export default connect(mapStateToProps)(Category);

Category.propTypes = {
  categories: PropTypes.array
};
