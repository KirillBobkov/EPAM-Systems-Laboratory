import '../styles/index.scss';
import { Game } from './entities/';
import { welcomePage, gameOverPage, resetGame, restartGame, pauseGame, bestScoreField, startGame, currentScoreField, currentHealthField } from './services';

const game = new Game();

function onKeyDown(event) {
  game.keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  game.keyState[event.keyCode] = false;
}

function disablePage(page) {
  page.style.display = 'none';
}

function enablePage(page) {
  page.style.display = 'block';
}

function setBestResult() {
  const data = sessionStorage.getItem('bestScore');
  if (data < game.unit.score || data == null) {
    sessionStorage.setItem('bestScore', game.unit.score);
  }
}

function getBestResult() {
  bestScoreField.innerHTML = sessionStorage.getItem('bestScore') || 0;
}

function checkGameOver() {
  if (game.over()) {
    enablePage(gameOverPage);
    setBestResult();
  }
}

function setCurrentDataOfGame() {
  currentScoreField.innerHTML = game.unit.score;
  currentHealthField.innerHTML = game.unit.health;
}

function start() {
  disablePage(welcomePage);
  getBestResult();
  setCurrentDataOfGame();
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
  } else {
    pauseGame.innerHTML = 'Resume';
  }
  start();
}

function reset() {
  game.reset();

  if (!game.running) {
    game.running = !game.running;
    start();
  }
}

function restart() {
  disablePage(gameOverPage);
  reset();
}

pauseGame.addEventListener('click', pause);
resetGame.addEventListener('click', reset);
restartGame.addEventListener('click', restart);
startGame.addEventListener('click', start);

window.document.addEventListener('keydown', onKeyDown);
window.document.addEventListener('keyup', onKeyUp);
