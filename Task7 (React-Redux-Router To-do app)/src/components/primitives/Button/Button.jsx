import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={'button ' + `${props.className || ''}`}
      id={`${props.id || ''}`}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func
};
