import { Component } from './Component';
import { playField } from '../services';

function Explosion({
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
  this.animationX = 165;
  this.animationY = 0;
}


Explosion.prototype = Object.create(Component.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.drawExplosion = function drawExplosion() {
  playField.ctx.drawImage(
    this.image,
    this.animationX,
    this.animationY,
    80,
    80,
    this.positionX - 30,
    this.positionY - 55,
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
