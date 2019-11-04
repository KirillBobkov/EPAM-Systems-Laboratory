function collisionCheck(a, b) {
  return (a.positionX + a.width) - 10 > b.positionX &&
      a.positionX < (b.positionX + b.width) - 10 &&
      (a.positionY + a.height) - 10 > b.positionY &&
      a.positionY < (b.positionY + b.height) - 10;
}

export { collisionCheck };
