import { Component } from './Component';
import { playField } from '../services';

function Background({
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

Background.prototype = Object.create(Component.prototype);
Background.prototype.constructor = Background;

Background.prototype.drawBack = function drawBack() {
  this.draw();
  playField.ctx.drawImage(this.image, this.positionX, this.positionY - playField.canvas.height);
};


export { Background };
