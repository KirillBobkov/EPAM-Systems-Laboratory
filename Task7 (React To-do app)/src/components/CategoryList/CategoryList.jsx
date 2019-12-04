import React from 'react';
import PropTypes from 'prop-types';
import { CategoryItem } from './CategoryItem';
import { CategoryAdd } from './CategoryAdd';
import './CategoryList.css';

export function CategoryList(props) {
  const categoryElements = props.data.map((category) =>
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

CategoryList.propTypes = {
  data: PropTypes.array
};
