import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditItem from './EditItem';
import { connect } from 'react-redux';

class EditList extends Component {
  render() {
    const { categories } = this.props;
    const classesArray = this.props.child
      ? 'category-list-container child'
      : 'category-list-container';
    const categoryElements = categories.map((category) =>
      <li key={category.id}>
        <EditItem category={category} />
      </li>
    );

    return (
      <div className={classesArray}>
        <ul className='category-list'>
          {categoryElements}
        </ul>
      </div>
    );
  }
}

EditList.propTypes = {
  categories: PropTypes.array,
  child: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoryReducer.filter(category => ownProps.parentId
      ? category.parentId === ownProps.parentId
      : category.parentId === '')
  };
};

export default connect(mapStateToProps)(EditList);
