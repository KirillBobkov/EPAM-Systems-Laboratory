import '../styles/index.scss';
import {
  resetGameButton,
  restartGameButton,
  pauseGameButton,
  startGameButton,
  resumeGameButton,
} from './services';

import { Init } from './main';

window.onload = () => {
  const init = new Init();

  pauseGameButton.addEventListener('click', init.pause);
  resumeGameButton.addEventListener('click', init.resume);
  resetGameButton.addEventListener('click', init.restart);
  restartGameButton.addEventListener('click', init.restart);
  startGameButton.addEventListener('click', init.start);
};
