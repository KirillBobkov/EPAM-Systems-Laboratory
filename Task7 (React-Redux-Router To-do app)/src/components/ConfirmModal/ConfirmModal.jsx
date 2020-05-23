import './ConfirmModal.scss';
import React from 'react';
import { Button } from '../../components/primitives';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function ConfirmModal(props) {
  const { onConfirm, onDeny } = props;

  return ReactDOM.createPortal(
    <div className='modal-confirm'>
      <div className='modal-confirm__container'>
        <p className='modal-confirm__description'>
      You want to delete category. Are you shure?
        </p>
        <div className='modal-confirm__actions'>
          <Button
            onClick={(event) => onConfirm(event)}
            className='button--with-border'
            text='Yes'
          />
          <Button
            onClick={onDeny}
            className='button--with-border'
            text='No'
          />
        </div>

      </div>
    </div>,
    document.getElementById('portal'));
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func
};
