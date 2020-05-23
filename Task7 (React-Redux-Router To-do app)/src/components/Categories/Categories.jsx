import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import EditItem from '../EditItem';
import './Categories.scss';
import { connect } from 'react-redux';

function Categories(props) {
  const { categories, edit } = props;
  const classes = props.child
    ? 'category-list-container child'
    : 'category-list-container';
  const categoryElements = categories.map((category) =>
    <li key={category.id}>
      {edit
        ? <EditItem category={category} />
        : <CategoryItem category={category} />}
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

Categories.propTypes = {
  categories: PropTypes.array,
  child: PropTypes.bool,
  edit: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoryReducer.filter(category => ownProps.parentId
      ? category.parentId === ownProps.parentId
      : category.parentId === '')
  };
};

export default connect(mapStateToProps)(Categories);
