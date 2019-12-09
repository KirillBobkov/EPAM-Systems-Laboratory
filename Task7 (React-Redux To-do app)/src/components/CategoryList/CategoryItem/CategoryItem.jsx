import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import './CategoryItem.scss';

export class CategoryItem extends Component {
  render() {
    const classArr = ['category-item'];
    return (
      <div className={classArr.join(' ')} id={this.props.category.id}>
        <div>
          <Button className='fas fa-chevron-left' />
          <span className='category-name'>{this.props.category.name}</span>
          <Button className='fas fa-edit' />
        </div>
        <div>
          <Button className='fas fa-trash-alt' />
          <Button className='fas fa-plus' />
        </div>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string
};
