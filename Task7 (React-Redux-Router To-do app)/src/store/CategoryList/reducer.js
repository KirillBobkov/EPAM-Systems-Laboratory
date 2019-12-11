import { ADD_TODO, CHECK_TODO, DELETE_TODO, FIND_TODO } from './actions';

const initialState = require('../../items.json');

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newState = [action.payload, ...state];
      return newState;
    }
    case CHECK_TODO: {
      const newState = [...state].map(item => {
        if (item.id !== action.id) {
          return item;
        }
        return {
          ...item,
          done: !item.done
        };
      });
      return newState;
    }
    case FIND_TODO: {
      const newState = [...state];
      return newState.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
    }
    case DELETE_TODO: {
      const newState = state.filter(item => item.id !== action.id);
      return newState;
    }
    default:
      return state;
  }
};
