import { ADD_CATEGORY, DELETE_CATEGORY, CHECK_CATEGORY } from './actions';

const initialState = require('../../items.json');

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newState = [action.payload, ...state];
      return newState;
    }
    case DELETE_CATEGORY: {
      const newState = state.filter(item => item.id !== action.id);
      return newState;
    }

    case CHECK_CATEGORY: {
      const newState = [...state].map(item => {
        return {
          ...item,
          checked: false
        };
      });

      return newState.map(item => {
        if (item.id !== action.id) {
          return item;
        }
        return {
          ...item,
          checked: !item.checked
        };
      });
    }
    default:
      return state;
  }
};
