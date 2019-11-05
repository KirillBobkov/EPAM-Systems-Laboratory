import '../styles/index.scss';
import { Game, unit } from './entities/index';

const game = new Game();

function onKeyDown(event) {
  game.keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  game.keyState[event.keyCode] = false;
}


const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseGame);

function pauseGame() {
  game.running = !game.running; 
  if (game.running) start();
}


const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  game.enemyArray = [];
  game.bonusArray = [];
  unit.health = 300;
  unit.score = 0;
  outputScore.innerHTML = unit.score;
  outputHealth.innerHTML = unit.health;
}

function start() {
  disableWeclomePage();
  game.update();
  game.render();
  if (game.running) {
    requestAnimationFrame(start);
  }
}

function disableWeclomePage() {
  const welcomePage = document.getElementById('welcomePage');
  welcomePage.style.display = 'none';
}


const buttonStart = document.getElementById("buttonStart");
buttonStart.addEventListener('click', start);

window.document.addEventListener('keydown', onKeyDown, false);
window.document.addEventListener('keyup', onKeyUp, false);

