import { Component } from './Component';
import { playField } from '../services';

function Unit({
  image,
  positionX,
  positionY,
  width,
  height,
  health,
}) {
  Component.call(this, {
    image,
    positionX,
    positionY,
  });

  this.width = width;
  this.height = height;
  this.health = health;
  this.score = 0;
  this.animationX = 3;
  this.animationY = 0;
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

