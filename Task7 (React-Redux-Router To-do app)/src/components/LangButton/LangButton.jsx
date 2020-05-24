
import { LangContext } from '../../lang-context/lang-context';
import React from 'react';
import { Button } from '../primitives/Button';

function LangButton() {
  return (
    <LangContext.Consumer>
      {({ lang, toggleLang }) => (
        <Button
          onClick={toggleLang}
          text={lang.swichLang}
          className='button--with-border'
        />
      )}
    </LangContext.Consumer>
  );
}

export default LangButton;
