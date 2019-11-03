/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */

import { KEY_CODES } from './constants/index';
import { generateRandomXPosition } from './helpers/index';


function Context() {
  this.canvas = null;
  this.ctx = null;
}

Context.prototype.create = function (canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
};

const playField = new Context();
playField.create('canvas');

// flags and variables
let running = true;
let speedY = 10;
let timer = 0;
const enemyArray = [];
const bonusArray = [];
const keyState = [];

// class Component
function Component(image, src, positionX, positionY, width, height) {
  this.image = image;
  this.image.src = src;
  this.positionX = positionX;
  this.positionY = positionY;
  this.width = width;
  this.height = height;
}

// class Background
function Background(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Background.prototype = Object.create(Component.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
  playField.ctx.drawImage(this.image, this.positionX, this.positionY - playField.canvas.height);
};

Background.prototype.move = function move() {
  if (this.positionY > playField.canvas.height) {
    const newPosition = this.positionY - playField.canvas.height;
    this.positionY = newPosition;
  }
  this.positionY += speedY;
};

const background = new Background(new Image(), 'src/image/back3.png', 0, 0, 592, 900);

// class Enemy
function Enemy(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
};


// class Unit
function Unit(image, src, positionX, positionY, width, height, health) {
  Component.call(this, image, src, positionX, positionY, width, height);

  this.health = health;
  this.score = 0;
}

Unit.prototype = Object.create(Component.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.move = function move() {
  if (keyState[KEY_CODES.RIGHT_ARROW] && this.positionX < playField.canvas.width - this.width) {
    this.positionX += 6;
  }
  if (keyState[KEY_CODES.LEFT_ARROW] && this.positionX > 0) {
    this.positionX -= 6;
  }
  if (keyState[KEY_CODES.UP_ARROW]) {
    speedY += 0.1;
  }
  if (keyState[KEY_CODES.DOWN_ARROW]) {
    speedY -= 0.1;
    if (speedY < 10) {
      speedY = 10;
    }
  }
};

Unit.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
};

const unit = new Unit(new Image(), 'src/image/superman.png', 170, 700, 33, 85, 30);

// class Bonus
function Bonus(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Bonus.prototype = Object.create(Component.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
};

// event listeners
function onKeyDown(event) {
  keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  keyState[event.keyCode] = false;
}

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// const generateRandomXPosition = () => {
//   const randomPositionX = Math.floor(Math.random() * (canvas.width - unit.width));
//   return randomPositionX;
// };

// collisions
function collisionCheck(a, b) {
  return a.positionX + a.width - 10 > b.positionX &&
    a.positionX < b.positionX + b.width - 10 &&
    a.positionY + a.height - 10 > b.positionY &&
    a.positionY < b.positionY + b.height - 10;
}

function collisionOccursBonus() {
  bonusArray.forEach((bonusItem, index) => {
    if (collisionCheck(bonusItem, unit)) {
      unit.score += 1;
      bonusArray.splice(index, 1);
    }
  });
}

function gameOver() {
  running = false;
}

function collisionOccursEnemy() {
  enemyArray.forEach((enemyItem) => {
    if (collisionCheck(enemyItem, unit)) {
      unit.health -= 1;
      if (unit.health === 0) {
        gameOver();
      }
    }
  });
}

function generateEnemy() {
  timer += 1;
  if (timer % 20 === 0) {
    const enemy = new Enemy(new Image(), 'src/image/barrier1.png', generateRandomXPosition(), -200, 43, 180);
    enemyArray.push(enemy);
  }

  enemyArray.forEach((enemyItem, index) => {
    enemyItem.positionY += speedY;
    if (enemyItem.positionY > playField.canvas.height + 400) {
      enemyArray.splice(index, 1);
    }
  });
}

function generateBonus() {
  if (timer % 10 === 0) {
    const bonus = new Enemy(new Image(), 'src/image/bonus.png', generateRandomXPosition(), -100, 29, 41);
    bonusArray.push(bonus);
  }

  bonusArray.forEach((bonusItem, index) => {
    bonusItem.positionY += speedY;
    if (bonusItem.positionY > playField.canvas.height + 500) {
      bonusArray.splice(index, 1);
    }
  });
}

function update() {
  background.move();
  unit.move();
  collisionOccursEnemy();
  collisionOccursBonus();
  generateEnemy();
  generateBonus();
}

function render() {
  // render background
  background.draw();

  // render enemies
  enemyArray.forEach((enemyItem) => {
    enemyItem.draw();
  });

  // render bonuses
  bonusArray.forEach((bonusItem) => {
    bonusItem.draw();
  });

  // render unit
  unit.draw();

  // render score and health info
  playField.ctx.fillStyle = '#000000';
  playField.ctx.fillRect(10, playField.canvas.height - 40, 150, 30);
  playField.ctx.fillRect(410, playField.canvas.height - 40, 150, 30);
  playField.ctx.font = '26px Arial';
  playField.ctx.fillStyle = '#ffffff';
  playField.ctx.fillText(`Health: ${unit.health}`, 15, playField.canvas.height - 15);
  playField.ctx.fillText(`Score: ${unit.score}`, playField.canvas.width - 150, playField.canvas.height - 15);
}

function gameStart() {
  update();
  render();
  if (running) {
    requestAnimationFrame(gameStart);
  }
}
gameStart();
