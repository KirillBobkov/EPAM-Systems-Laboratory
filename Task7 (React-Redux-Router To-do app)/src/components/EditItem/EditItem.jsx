import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../primitives';
import { moveTaskToCategory } from '../../store/Tasks';
import Categories from '../Categories';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.handleMoveCategory = this.handleMoveCategory.bind(this);
  }

  handleMoveCategory() {
    const { category, location, moveTaskToCategory, push } = this.props;
    const path = location.pathname.split('/');
    moveTaskToCategory(path[path.length - 1], category.id);
    push(`/edit/${category.id}/${path[path.length - 1]}`);
  }

  render() {
    const { category, location } = this.props;
    const buttonPlace = location.pathname.includes(category.id)
      ? <span />
      : <Button
        onClick={this.handleMoveCategory}
        className='fas fa-arrow-circle-left'
        // eslint-disable-next-line indent
        />;
    const classNames = location.pathname.includes(category.id)
      ? 'category-item checked'
      : 'category-item';

    return (
      <>
        <div
          className={classNames}
          id={category.id}
        >
          <div>
            <span className='category-name'>{category.name}</span>
          </div>
          {buttonPlace}
        </div>
        <Categories
          edit
          child
          parentId={category.id}
        />
      </>
    );
  }
}

EditItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string,
  push: PropTypes.func,
  moveTaskToCategory: PropTypes.func,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = {
  push, moveTaskToCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
