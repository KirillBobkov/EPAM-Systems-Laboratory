import { KEY_CODES } from '../constants';
import { playField, outputScore, outputHealth } from '../services';
import { Enemy, Bonus, Explosion, Background, Unit } from './index';
import { collisionCheck, generateRandomXPosition, imageAdapter, chooseSrcForEnemy } from '../helpers';

const unit = new Unit({
  image: imageAdapter('src/image/superman.png'),
  positionX: 170,
  positionY: 400,
  width: 25,
  height: 78,
  health: 100,
});

const background = new Background({
  image: imageAdapter('src/image/back3.png'),
  positionX: 0,
  positionY: 0,
  width: playField.canvas.width,
  height: playField.canvas.height,
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
  if (this.timer % 40 === 0) {
    const enemy = new Enemy({
      image: chooseSrcForEnemy(),
      positionX: generateRandomXPosition(),
      positionY: -350,
      width: 70,
      height: 240,
    });
    this.enemyArray.push(enemy);
  }
};

Game.prototype.generateBonus = function generateBonus() {
  if (this.timer % 10 === 0) {
    const bonus = new Bonus({
      image: imageAdapter('src/image/bonus.png'),
      positionX: generateRandomXPosition(),
      positionY: -32,
      width: 16,
      height: 32,
    });

    if (this.timer % 100 === 0) {
      bonus.image = imageAdapter('src/image/bonusSpeed.png');
      bonus.boost = true;
      bonus.width = 37;
      bonus.height = 43;
    }
    this.bonusArray.push(bonus);
  }
};

Game.prototype.collisionOccursEnemy = function collisionOccursEnemy() {
  this.enemyArray.forEach((enemyItem) => {
    if (collisionCheck(enemyItem, unit)) {
      unit.health -= 1;

      if (unit.health === 0) {
        this.running = false;
      }

      const explosion = new Explosion({
        image: imageAdapter('src/image/explosion.png'),
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
};

Game.prototype.collisionOccursBonus = function collisionOccursBonus() {
  this.bonusArray.forEach((bonusItem, index) => {
    if (collisionCheck(bonusItem, unit)) {
      unit.score += 1;
      if ('boost' in bonusItem) {
        this.speedY = 10;
      }
      this.bonusArray.splice(index, 1);
    }
  });
};

Game.prototype.moveEntities = function moveEntities() {
  // move background
  if (background.positionY > playField.canvas.height) {
    const newPosition = background.positionY - playField.canvas.height;
    background.positionY = newPosition;
  }
  background.positionY += this.speedY;

  // move explosions
  this.explosionArray.forEach((explosionItem, index) => {
    explosionItem.positionY += this.speedY;
    if (explosionItem.positionY > playField.canvas.height * 2) {
      this.explosionArray.splice(index, 1);
    }
  });

  // move bonuses
  this.bonusArray.forEach((bonusItem, index) => {
    bonusItem.positionY += this.speedY;
    if (bonusItem.positionY > playField.canvas.height * 2) {
      this.bonusArray.splice(index, 1);
    }
  });

  // move enemies
  this.enemyArray.forEach((enemyItem, index) => {
    enemyItem.positionY += this.speedY;
    if (enemyItem.positionY > playField.canvas.height * 2) {
      this.enemyArray.splice(index, 1);
    }
  });
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
    if (this.speedY < 6) {
      this.speedY = 6;
    }
  }
};

Game.prototype.update = function update() {
  this.userEvent();
  this.generateEnemy();
  this.generateBonus();
  this.collisionOccursEnemy();
  this.collisionOccursBonus();
  this.moveEntities();
};

Game.prototype.render = function render() {
  background.drawBack();

  this.enemyArray.forEach((enemyItem) => {
    enemyItem.draw();
  });

  this.bonusArray.forEach((bonusItem) => {
    bonusItem.draw();
  });

  this.explosionArray.forEach((explosionItem) => {
    explosionItem.drawExplosion();
  });

  unit.draw();

  outputScore.innerHTML = unit.score;
  outputHealth.innerHTML = unit.health;
};

export { Game, unit, background };
