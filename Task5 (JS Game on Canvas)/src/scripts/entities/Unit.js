
import { Component } from './Component';
import { playField } from '../services';

function Unit({
  image,
  src,
  positionX,
  positionY,
  width,
  height,
  health,
}) {
  Component.call(this, {
    image,
    src,
    positionX,
    positionY,
    width,
    height,
  });

  this.health = health;
  this.score = 0;
}

Unit.prototype = Object.create(Component.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.moveRight = function moveLeft() {
  if (this.positionX < playField.canvas.width - this.width) {
    this.positionX += 6;
  }
};

Unit.prototype.moveLeft = function moveLeft() {
  if (this.positionX > 0) {
    this.positionX -= 6;
  }
};

export { Unit };

