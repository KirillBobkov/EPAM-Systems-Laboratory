import { Game } from '../entities';
import {
  welcomePage,
  gameOverPage,
  bestScoreField,
  currentScoreField,
  currentHealthField,
  setCurrentDataOfGame,
  setBestResult,
  getBestResult,
} from '../services';
import { disablePage, enablePage } from '../helpers';

const game = new Game();

const onKeyDown = (event) => {
  game.keyState[event.keyCode] = true;
};

const onKeyUp = (event) => {
  game.keyState[event.keyCode] = false;
};

window.document.addEventListener('keydown', onKeyDown);
window.document.addEventListener('keyup', onKeyUp);


function Init() {
  this.pause = () => {
    game.running = false;
  };

  this.resume = () => {
    game.running = true;
  };

  this.restart = () => {
    disablePage(gameOverPage);
    game.restart();
  };

  this.checkGameOver = () => {
    if (game.over()) {
      setBestResult(game.unit.score);
      enablePage(gameOverPage);
    }
  };

  this.start = () => {
    disablePage(welcomePage);
    getBestResult(bestScoreField);
    setCurrentDataOfGame(game, currentScoreField, currentHealthField);

    if (game.running) {
      game.update();
      game.render();
    }

    this.checkGameOver();
    requestAnimationFrame(this.start);
  };
}

export { Init };

