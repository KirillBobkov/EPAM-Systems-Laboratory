import { FIND_TODO, ADD_TODO, CHECK_TODO, DELETE_ITEMS, EDIT_TODO, MOVE_TODO } from './actions';

const initialState = require('../../items.json');

export default (state = initialState.items, action) => {
  switch (action.type) {
    case MOVE_TODO: {
      const newState = [...state];
      newState.filter(item => item.id === action.payload.id).map(item => {
        item.categoryId = action.payload.categoryId;
      });
      return newState;
    }
    case CHECK_TODO: {
      const newState = [...state];
      return newState.map(item => {
        if (item.id !== action.id) {
          return item;
        } else {
          return {
            ...item,
            done: !item.done
          };
        }
      });
    }
    case DELETE_ITEMS: {
      const newState = state.filter(item => item.categoryId !== action.id);
      return newState;
    }
    case ADD_TODO: {
      const newState = [action.payload, ...state];
      return newState;
    }
    case FIND_TODO: {
      const newState = [...state];
      return newState.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
    }
    case EDIT_TODO: {
      const newState = [...state];
      newState.filter(item => item.id === action.payload.id).map(item => {
        item.name = action.payload.name;
        item.description = action.payload.description;
      });
      return newState;
    }
    default: {
      return state;
    }
  }
};
