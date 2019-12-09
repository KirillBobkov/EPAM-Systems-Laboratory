import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CategoryItem } from './CategoryItem';
import { CategoryAdd } from './CategoryAdd';
import './CategoryList.scss';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render() {
    const categoryElements = this.props.state.map((category) =>
      <li key={category.id}><CategoryItem category={category} /></li>
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
    state
  };
};

export default connect(
  mapStateToProps
)(CategoryList);
