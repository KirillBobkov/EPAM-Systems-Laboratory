import { Component } from './Component';
import { playField } from '../services';

function Explosion({
  image,
  src,
  positionX,
  positionY,
  width,
  height,
}) {
  Component.call(this, {
    image,
    src,
    positionX,
    positionY,
    width,
    height,
  });

  this.animationX = 5;
  this.animationY = 0;
}

Explosion.prototype = Object.create(Component.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.draw = function draw() {
  playField.ctx.drawImage(
    this.image,
    this.animationX,
    this.animationY, 
    80,
    80,
    this.positionX - 25,
    this.positionY - 50,
    120,
    120,
  );

  this.animationX += 80;
  if (this.animationX > 640) {
    this.animationY += 80;
    this.animationX = 5;
  }
};

export { Explosion };
