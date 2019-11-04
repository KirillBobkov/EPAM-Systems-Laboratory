
import { Component } from './Component';

function Bonus(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Bonus.prototype = Object.create(Component.prototype);
Bonus.prototype.constructor = Bonus;

export { Bonus };
