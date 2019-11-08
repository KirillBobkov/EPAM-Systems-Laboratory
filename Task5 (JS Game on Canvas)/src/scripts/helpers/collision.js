function collisionCheck(a, b) {
  const collisionPadding = 5;
  return (a.positionX + a.width) - collisionPadding > b.positionX &&
          a.positionX + collisionPadding < (b.positionX + b.width) &&
         (a.positionY + a.height) - collisionPadding > b.positionY &&
          a.positionY + collisionPadding < (b.positionY + b.height);
}

export { collisionCheck };
