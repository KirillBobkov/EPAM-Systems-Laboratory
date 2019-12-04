import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.css';

export function CategoryItem(props) {
  const { category } = props;
  return (
    <div className='category-item' id={category.id}>
      <div>
        <Button className='fas fa-chevron-left' />
        <span className='category-name'>{category.name}</span>
        <Button className='fas fa-edit' />
      </div>
      <div>
        <Button className='fas fa-trash-alt' />
        <Button className='fas fa-plus' />
      </div>
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string
};
