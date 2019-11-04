import '../styles/index.scss';

import { KEY_CODES } from './constants/index';

import { playField } from './services/index';

import { Enemy, Bonus, Unit, Background, Explosion } from './entities/index';

import { collisionCheck, generateRandomXPosition, generateRandomSrc } from './helpers/index';


// flags and variables
function Game() {
  this.running = true;
  this.speedY = 8;
  this.timer = 0;
  this.enemyArray = [];
  this.bonusArray = [];
  this.explosionArray = [];
}

const game = new Game();

const background = new Background(new Image(), 'src/image/back3.png', 0, 0, 592, 900);

const unit = new Unit(new Image(), 'src/image/superman.png', 170, 400, 25, 67, 300);

const keyState = [];

// event listeners
function userEvent() {
  if (keyState[KEY_CODES.RIGHT_ARROW]) {
    unit.moveLeft();
  }
  if (keyState[KEY_CODES.LEFT_ARROW]) {
    unit.moveRight();
  }
  if (keyState[KEY_CODES.UP_ARROW]) {
    game.speedY += 0.2;
    if (game.speedY > 20) {
      game.speedY = 20;
    }
  }
  if (keyState[KEY_CODES.DOWN_ARROW]) {
    game.speedY -= 0.2;
    if (game.speedY < 8) {
      game.speedY = 8;
    }
  }
}

function onKeyDown(event) {
  keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  keyState[event.keyCode] = false;
}

window.document.addEventListener('keydown', onKeyDown, false);
window.document.addEventListener('keyup', onKeyUp, false);


Game.prototype.generateEnemy = function generateEnemy() {
  this.timer += 1;
  if (this.timer % 30 === 0) {
    const enemy = new Enemy(new Image(), generateRandomSrc(), generateRandomXPosition(), -350, 70, 240);
    this.enemyArray.push(enemy);
  }

  this.enemyArray.forEach((enemyItem, index) => {
    enemyItem.positionY += this.speedY;
    if (enemyItem.positionY > playField.canvas.height * 2) {
      this.enemyArray.splice(index, 1);
    }
  });
};

Game.prototype.generateBonus = function generateBonus() {
  if (this.timer % 10 === 0) {
    const bonus = new Bonus(new Image(), 'src/image/bonus.png', generateRandomXPosition(), -32, 16, 32);
    this.bonusArray.push(bonus);
  }
  if (this.timer % 100 === 0) {
    const bonus = new Bonus(new Image(), 'src/image/bonusSpeed.png', generateRandomXPosition(), -32, 34, 44);
    bonus.run = false;
    this.bonusArray.push(bonus);
  }

  this.bonusArray.forEach((bonusItem, index) => {
    bonusItem.positionY += this.speedY;
    if (bonusItem.positionY > playField.canvas.height * 2) {
      this.bonusArray.splice(index, 1);
    }
  });
};

Game.prototype.collisionOccursEnemy = function collisionOccursEnemy() {
  this.enemyArray.forEach((enemyItem) => {
    if (collisionCheck(enemyItem, unit)) {
      unit.health -= 1;
      if (unit.health === 0) {
        this.running = false;
      }

      const explosion = new Explosion(new Image(), 'src/image/explosion.png', enemyItem.positionX + 10, enemyItem.positionY + 90, 80, 80, 0, 0);
      this.explosionArray.push(explosion);
    }
  });

  this.explosionArray.forEach((explosionItem) => {
    explosionItem.positionY += this.speedY;
  });
};


Game.prototype.collisionOccursBonus = function collisionOccursBonus() {
  this.bonusArray.forEach((bonusItem, index) => {
    if (collisionCheck(bonusItem, unit)) {
      unit.score += 1;
      if (bonusItem.hasOwnProperty('run')) {
        game.speedY = 15;
      }
      this.bonusArray.splice(index, 1);
    }
  });
};

Game.prototype.moveBackground = function moveBackground() {
  if (background.positionY > playField.canvas.height) {
    const newPosition = background.positionY - playField.canvas.height;
    background.positionY = newPosition;
  }
  background.positionY += this.speedY;
};

Game.prototype.update = function update() {
  userEvent();
  this.moveBackground();
  this.collisionOccursEnemy();
  this.collisionOccursBonus();
  // this.generateExplosion();
  this.generateEnemy();
  this.generateBonus();
};

Game.prototype.render = function render() {
  // render background
  background.draw();

  // render enemies
  this.enemyArray.forEach((enemyItem) => {
    enemyItem.draw();
  });

  // render bonuses
  this.bonusArray.forEach((bonusItem) => {
    bonusItem.draw();
  });

  this.explosionArray.forEach((explosionItem) => {
    explosionItem.draw();
  });

  // render unit
  unit.draw();

  playField.ctx.fillStyle = '#000000';
  playField.ctx.fillRect(10, playField.canvas.height - 40, 150, 30);
  playField.ctx.fillRect(410, playField.canvas.height - 40, 150, 30);
  playField.ctx.font = '26px Arial';
  playField.ctx.fillStyle = '#ffffff';
  playField.ctx.fillText(`Health: ${unit.health}`, 15, playField.canvas.height - 15);
  playField.ctx.fillText(`Score: ${unit.score}`, playField.canvas.width - 150, playField.canvas.height - 15);
};


function start() {
  game.update();
  game.render();
  if (game.running) {
    requestAnimationFrame(start);
  }
}

window.document.addEventListener('load', start());

