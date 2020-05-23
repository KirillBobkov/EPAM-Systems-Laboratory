import PropTypes from 'prop-types';
import React from 'react';
import Categories from '../../components/Categories';
import EditWindow from '../../components/EditWindow';
import './EditPage.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

function EditPage(props) {
  const { currentItem: item, push } = props;

  if (!item) {
    push('/main');
    return null;
  }

  return (
    <div className='page'>
      <h1>{item.name}</h1>
      <main className='content'>
        <aside className='categories-container'>
          <Categories edit />
        </aside>
        <EditWindow id={item.id} />
      </main>
    </div>
  );
}

EditPage.propTypes = {
  currentItem: PropTypes.object,
  push: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentItem: state.itemReducer.filter(item => item.id === ownProps.match.params.item)[0]
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
