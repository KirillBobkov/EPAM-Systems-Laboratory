const generateRandomSrc = () => {
  const rand = Math.floor(1 + Math.random() * 7);
  return `src/image/barrier${rand}.png`;
};

export { generateRandomSrc };
