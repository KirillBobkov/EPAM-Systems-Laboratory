import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import CategoryAdd from './CategoryAdd';
import './CategoryList.scss';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class CategoryList extends Component {
  render() {
    const { state } = this.props;

    const categoryElements = state.map((category) =>
      <li key={category.id}>
        <NavLink
          to={`/${category.id}`}
          activeClassName='active'
          key={category.id}
        >
          <CategoryItem category={category} />
        </NavLink>
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
    state: state.categoryReducer
  };
};

export default connect(
  mapStateToProps
)(CategoryList);

CategoryList.propTypes = {
  state: PropTypes.array
};
