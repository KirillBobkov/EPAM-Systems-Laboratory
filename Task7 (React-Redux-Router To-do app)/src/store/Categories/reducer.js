import { ADD_CATEGORY, DELETE_CATEGORY, CHANGE_NAME_OF_CATEGORY } from './actions';

const initialState = require('../../items.json');

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newState = [action.payload, ...state];
      return newState;
    }
    case DELETE_CATEGORY: {
      const newState = state.filter(category => category.id !== action.id);
      return newState;
    }
    case CHANGE_NAME_OF_CATEGORY: {
      const newState = [...state];
      newState.filter(category => category.id === action.payload.id).map(category => {
        category.name = action.payload.name;
      });
      return newState;
    }
    default:
      return state;
  }
};
