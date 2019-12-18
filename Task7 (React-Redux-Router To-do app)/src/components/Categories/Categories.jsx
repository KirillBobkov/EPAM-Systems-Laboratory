import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import CategoryAdd from './CategoryAdd';
import './Categories.scss';
import { connect } from 'react-redux';
import URI from 'urijs';

class Category extends Component {
  render() {
    const { categories } = this.props;

    const categoryElements = categories.map((category) =>
      <li key={category.id}>
        <CategoryItem category={category} />
      </li>
    );

    const currenURI = new URI(window.location.pathname + window.location.search);
    const arr = currenURI.path().split('/');
    const toolbar = (arr.includes('edit')) ? <span /> : <CategoryAdd />;

    return (
      <div className='category-list-container'>
        {toolbar}
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
