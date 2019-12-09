
const initialState = require('./items.json');

const ADD_TODO = 'ADD_TODO';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newState = [...state, action.todo];
      return newState;
    }
    default:
      return state;
  }
};
