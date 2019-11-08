import { playField } from '../services';

function Component({
  image,
  positionX,
  positionY,
}) {
  this.image = image;
  this.positionX = positionX;
  this.positionY = positionY;
}

Component.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
};

export { Component };
