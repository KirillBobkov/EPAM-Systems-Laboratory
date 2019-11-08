function imageAdapter(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function chooseSrcForEnemy() {
  const image = new Image();
  const rand = Math.floor(1 + (Math.random() * 7));
  image.src = `src/image/barrier${rand}.png`;
  return image;
}

export { imageAdapter, chooseSrcForEnemy };
