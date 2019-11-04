import { Component } from './Component';
import { playField } from '../services/index';

function Background(image, src, positionX, positionY, width, height) {
  Component.call(this, image, src, positionX, positionY, width, height);
}

Background.prototype = Object.create(Component.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
  playField.ctx.drawImage(this.image, this.positionX, this.positionY - playField.canvas.height);
};

export { Background };
