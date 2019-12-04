import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export function Button(props) {
  return (
    <button
      className={'button ' + `${props.className || ''}`}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};
