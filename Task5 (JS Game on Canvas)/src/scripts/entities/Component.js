import { playField } from '../services';


function Component({
  image,
  src,
  positionX,
  positionY,
  width,
  height,
}) {
  this.image = image;
  this.src = src;
  this.positionX = positionX;
  this.positionY = positionY;
  this.width = width;
  this.height = height;
}

Component.prototype.draw = function draw() {
  playField.ctx.drawImage(this.image, this.positionX, this.positionY);
};

export { Component };
