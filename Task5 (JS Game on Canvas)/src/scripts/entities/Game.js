import { KEY_CODES, unitConfig, backgroundConfig, enemyConfig, bonusConfig, explosionConfig } from '../constants';
import { playField } from '../services';
import { Enemy, Bonus, Explosion, Background, Unit } from './index';
import { collisionCheck, generateRandomXPosition, imageAdapter, chooseSrcForEnemy } from '../helpers';

function Game() {
  this.running = true;
  this.speedY = 8;
  this.timer = 0;
  this.enemyArray = [];
  this.bonusArray = [];
  this.explosionArray = [];
  this.keyState = [];

  this.background = new Background({
    image: backgroundConfig.image,
    positionX: backgroundConfig.positionX,
    positionY: backgroundConfig.positionY,
    width: playField.canvas.width,
    height: playField.canvas.height,
  });

  this.unit = new Unit({
    image: unitConfig.image,
    positionX: unitConfig.positionX,
    positionY: unitConfig.positionY,
    width: unitConfig.width,
    height: unitConfig.height,
    health: unitConfig.health,
    score: unitConfig.score,
  });
}

Game.prototype.generateEnemy = function generateEnemy() {
  this.timer += 1;
  if (this.timer % 35 === 0) {
    const enemy = new Enemy({
      image: chooseSrcForEnemy(),
      positionX: generateRandomXPosition(),
      positionY: enemyConfig.positionY,
      width: enemyConfig.width,
      height: enemyConfig.height,
    });

    this.enemyArray.push(enemy);
  }
};

Game.prototype.generateBonus = function generateBonus() {
  if (this.timer % 10 === 0) {
    const bonus = new Bonus({
      image: bonusConfig.image,
      positionX: generateRandomXPosition(),
      positionY: bonusConfig.positionY,
      width: bonusConfig.width,
      height: bonusConfig.height,
    });

    if (this.timer % 100 === 0) {
      bonus.image = imageAdapter('public/bonusSpeed.png');
      bonus.width = bonusConfig.widthSpeedBonus;
      bonus.height = bonusConfig.heightSpeedBonus;
      bonus.boost = true;
    }

    this.bonusArray.push(bonus);
  }
};

Game.prototype.collisionOccursEnemy = function collisionOccursEnemy() {
  this.enemyArray.forEach((enemyItem) => {
    if (collisionCheck(enemyItem, this.unit)) {
      this.unit.health -= 1;

      if (this.unit.health === 0) {
        this.running = false;
      }

      const explosion = new Explosion({
        image: explosionConfig.image,
        positionX: enemyItem.positionX,
        positionY: enemyItem.positionY + (enemyItem.height / 2),
        width: explosionConfig.width,
        height: explosionConfig.height,
        animationX: explosionConfig.animationX,
        animationY: explosionConfig.animationY,
      });
      this.explosionArray.push(explosion);
    }
  });
};

Game.prototype.collisionOccursBonus = function collisionOccursBonus() {
  this.bonusArray.forEach((bonusItem, index) => {
    if (collisionCheck(bonusItem, this.unit)) {
      this.unit.score += 1;

      if ('boost' in bonusItem) {
        this.speedY = 12;
      }

      this.bonusArray.splice(index, 1);
    }
  });
};

Game.prototype.moveEntities = function moveEntities() {
  // move background
  if (this.background.positionY > playField.canvas.height) {
    const newPosition = this.background.positionY - playField.canvas.height;

    this.background.positionY = newPosition;
  }
  this.background.positionY += this.speedY;

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

Game.prototype.over = function over() {
  return this.unit.health === 0;
};

Game.prototype.restart = function restart() {
  this.bonusArray = [];
  this.enemyArray = [];
  this.explosionArray = [];
  this.speedY = 8;
  this.unit.score = unitConfig.score;
  this.unit.health = unitConfig.health;
  this.background.positionY = backgroundConfig.positionX;
  this.running = true;
};

Game.prototype.unitMoving = function unitMoving() {
  if (this.keyState[KEY_CODES.RIGHT_ARROW]) {
    this.unit.moveRight();
  }
  if (this.keyState[KEY_CODES.LEFT_ARROW]) {
    this.unit.moveLeft();
  }
  if (this.keyState[KEY_CODES.DOWN_ARROW]) {
    this.speedY -= 0.2;
    if (this.speedY < 8) {
      this.speedY = 8;
    }
  }
};

Game.prototype.changeUnit = function changeUnit() {
  if (this.speedY >= 12) {
    this.unit.image = imageAdapter('public/supermanBoost.png');
  } else {
    this.unit.image = unitConfig.image;
  }
};

Game.prototype.update = function update() {
  this.unitMoving();
  this.changeUnit();
  this.generateEnemy();
  this.generateBonus();
  this.collisionOccursEnemy();
  this.collisionOccursBonus();
  this.moveEntities();
};

Game.prototype.render = function render() {
  this.background.drawBack();

  this.enemyArray.forEach((enemyItem) => {
    enemyItem.draw();
  });

  this.bonusArray.forEach((bonusItem) => {
    bonusItem.draw();
  });

  this.explosionArray.forEach((explosionItem) => {
    explosionItem.drawExplosion();
  });

  this.unit.draw();
};

export { Game };
