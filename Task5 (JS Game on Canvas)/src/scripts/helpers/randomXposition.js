 export const generateRandomXPosition = () => {
    const canvasPadding = 50;
    return Math.floor(Math.random() * (canvas.width - canvasPadding));
  };