function collisionCheck(a, b) {
  const collisionPadding = 5;
  return (a.positionX + a.width) - collisionPadding > b.positionX &&
          a.positionX < (b.positionX + b.width) - collisionPadding &&
         (a.positionY + a.height) - collisionPadding > b.positionY &&
          a.positionY < (b.positionY + b.height) - collisionPadding;
}

export { collisionCheck };
