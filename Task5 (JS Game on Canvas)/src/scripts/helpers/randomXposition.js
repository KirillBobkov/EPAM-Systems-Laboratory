import { playField } from '../services';

const generateRandomXPosition = () => {
  const canvasPadding = 50;
  return Math.floor(Math.random() * (playField.canvas.width - canvasPadding));
};

export { generateRandomXPosition };
