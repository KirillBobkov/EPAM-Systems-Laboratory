import { KEY_CODES } from '../constants';
import { playField, outputScore, outputHealth } from '../services';
import { Enemy, Bonus, Explosion, Background, Unit } from './index';
import { collisionCheck, generateRandomXPosition, generateRandomSrc } from '../helpers';


const unitImg = new Image();
unitImg.src = 'src/image/superman.png';
const unitSrc = unitImg.src;

const unit = new Unit({
  image: unitImg,
  src: unitSrc,
  positionX: 170,
  positionY: 400,
  width: 25,
  height: 67,
  health: 300,
});

const backgroundImg = new Image();
backgroundImg.src = 'src/image/back3.png';
const backgroundSrc = backgroundImg.src;

const background = new Background({
  image: backgroundImg,
  src: backgroundSrc,
  positionX: 0,
  positionY: 0,
  width: playField.canvas.width,
  height: playField.canvas.width,
});

function Game() {
  this.running = true;
  this.pause = false;
  this.speedY = 6;
  this.timer = 0;
  this.enemyArray = [];
  this.bonusArray = [];
  this.explosionArray = [];
  this.keyState = [];
}

Game.prototype.generateEnemy = function generateEnemy() {
  this.timer += 1;
  if (this.timer % 50 === 0) {
    const enemyImg = new Image();
    enemyImg.src = generateRandomSrc();
    const enemySrc = enemyImg.src;

    const enemy = new Enemy({
      image: enemyImg,
      src: enemySrc,
      positionX: generateRandomXPosition(),
      positionY: -350,
      width: 70,
      height: 240,
    });

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
    const bonusImg = new Image();
    bonusImg.src = 'src/image/bonus.png';
    const bonusSrc = bonusImg.src;

    const bonus = new Bonus({
      image: bonusImg,
      src: bonusSrc,
      positionX: generateRandomXPosition(),
      positionY: -32,
      width: 16,
      height: 32,
    });

    this.bonusArray.push(bonus);
  }
  if (this.timer % 100 === 0) {
    const bonusSpeedImg = new Image();
    bonusSpeedImg.src = 'src/image/bonusSpeed.png';
    const bonusSpeedSrc = bonusSpeedImg.src;

    const bonusSpeed = new Bonus({
      image: bonusSpeedImg,
      src: bonusSpeedSrc,
      positionX: generateRandomXPosition(),
      positionY: -32,
      width: 34,
      height: 44,
    });

    bonusSpeed.run = true;
    this.bonusArray.push(bonusSpeed);
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
      const explosionImg = new Image();
      explosionImg.src = 'src/image/explosion.png';
      const explosionSrc = explosionImg.src;

      const explosion = new Explosion({
        image: explosionImg,
        src: explosionSrc,
        positionX: enemyItem.positionX,
        positionY: enemyItem.positionY + (enemyItem.height / 2),
        width: 100,
        height: 100,
        animationX: 0,
        animationY: 0,
      });
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
        this.speedY = 10;
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

Game.prototype.userEvent = function userEvent() {
  if (this.keyState[KEY_CODES.RIGHT_ARROW]) {
    unit.moveRight();
  }
  if (this.keyState[KEY_CODES.LEFT_ARROW]) {
    unit.moveLeft();
  }
  if (this.keyState[KEY_CODES.DOWN_ARROW]) {
    this.speedY -= 0.2;
    if (this.speedY < 8) {
      this.speedY = 8;
    }
  }
};

Game.prototype.update = function update() {
  this.userEvent();
  this.moveBackground();
  this.collisionOccursEnemy();
  this.collisionOccursBonus();
  this.generateEnemy();
  this.generateBonus();
};


Game.prototype.render = function render() {
  background.draw();

  this.enemyArray.forEach((enemyItem) => {
    enemyItem.draw();
  });

  this.bonusArray.forEach((bonusItem) => {
    bonusItem.draw();
  });

  this.explosionArray.forEach((explosionItem) => {
    explosionItem.draw();
  });

  unit.draw();

  outputScore.innerHTML = unit.score;
  outputHealth.innerHTML = unit.health;
};

export { Game, unit };
