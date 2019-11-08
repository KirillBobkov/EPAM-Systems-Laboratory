import '../styles/index.scss';
import { Game, background, unit } from './entities/';
import { welcomePage, gameOverPage, resetGame, restartGame, pauseGame, best, startGame } from './services';

const game = new Game();

function onKeyDown(event) {
  game.keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  game.keyState[event.keyCode] = false;
}

window.document.addEventListener('keydown', onKeyDown);
window.document.addEventListener('keyup', onKeyUp);

function disablePage(page) {
  page.style.display = 'none';
}

function checkGameOver() {
  if (unit.health === 0 && game.running === false) {
    gameOverPage.style.display = 'block';

    const data = sessionStorage.getItem('bestScore');
    if (data < unit.score || data == null) {
      sessionStorage.setItem('bestScore', unit.score);
    }
  }
}

function getBestResult() {
  best.innerHTML = sessionStorage.getItem('bestScore') || 0;
}

function start() {
  getBestResult();
  disablePage(welcomePage);
  game.update();
  game.render();
  checkGameOver();

  if (game.running) {
    requestAnimationFrame(start);
  }
}

function pause() {
  game.running = !game.running;
  if (game.running) {
    pauseGame.innerHTML = 'Pause';
    start();
  } else {
    pauseGame.innerHTML = 'Resume';
    start();
  }
}

function reset() {
  disablePage(gameOverPage);
  game.bonusArray = [];
  game.enemyArray = [];
  game.explosionArray = [];
  game.speedY = 6;
  unit.score = 0;
  unit.health = 100;
  background.positionY = 0;
  if (!game.running) {
    game.running = !game.running;
    start();
  }
}

pauseGame.addEventListener('click', pause);
resetGame.addEventListener('click', reset);
restartGame.addEventListener('click', reset);
startGame.addEventListener('click', start);
