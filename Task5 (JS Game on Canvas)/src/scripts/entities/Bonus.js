import { Component } from './Component';

function Bonus({
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

Bonus.prototype = Object.create(Component.prototype);
Bonus.prototype.constructor = Bonus;

export { Bonus };
