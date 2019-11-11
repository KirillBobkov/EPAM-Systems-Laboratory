export const setBestResult = (score) => {
  const data = sessionStorage.getItem('bestScore');
  if (data < score || data == null) {
    sessionStorage.setItem('bestScore', score);
  }
};

export const getBestResult = (field) => {
  field.innerHTML = sessionStorage.getItem('bestScore') || 0;
};

export const setCurrentDataOfGame = (game, scoreInput, healthInput) => {
  scoreInput.innerHTML = game.unit.score;
  healthInput.innerHTML = game.unit.health;
};
