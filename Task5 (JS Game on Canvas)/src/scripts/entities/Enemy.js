import { Component } from './Component';

function Enemy(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;

export { Enemy };
