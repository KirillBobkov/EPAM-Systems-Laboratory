import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../primitives';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';

class EditItem extends Component {
  render() {
    const { category } = this.props;
    return (

      <div className='category-item' id={category.id}>
        <div>
          <span className='category-name'>{category.name}</span>
        </div>
        <Button className='fas fa-plus' />
      </div>
    );
  }
}

EditItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string
};

const mapDispatchToProps = {
  push
};

export default connect(state => ({}), mapDispatchToProps)(EditItem);
