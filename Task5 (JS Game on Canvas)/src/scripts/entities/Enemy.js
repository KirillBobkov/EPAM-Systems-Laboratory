import { Component } from './Component';

function Enemy({
  image,
  positionX,
  positionY,
  width,
  height,
}) {
  Component.call(this, {
    image,
    positionX,
    positionY,
  });
  this.width = width;
  this.height = height;
}

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;

export { Enemy };
