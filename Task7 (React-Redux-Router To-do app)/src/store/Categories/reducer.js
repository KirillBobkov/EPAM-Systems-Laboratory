import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CHANGE_NAME_OF_CATEGORY
} from './actions';

export const initialState = require('../../items.json');

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newState = [action.payload, ...state];
      return newState;
    }
    case DELETE_CATEGORY: {
      const newArray = [...state];
      let categoriesToDeleteID = [action.payload.id];
      let length = 1;

      const findDeleteIDs = ids => {
        ids.forEach(id => {
          const children = newArray
            .filter(x => x.parentId === id)
            .map(x => x.id);
          categoriesToDeleteID = [...categoriesToDeleteID, ...children];
        });

        if (length !== categoriesToDeleteID.length) {
          length = categoriesToDeleteID.length;
          findDeleteIDs(categoriesToDeleteID.slice(length));
        }
      };

      findDeleteIDs(categoriesToDeleteID);
      return newArray.filter(category => !categoriesToDeleteID.includes(category.id));
    }

    case CHANGE_NAME_OF_CATEGORY: {
      const newState = [...state];
      newState
        .filter(category => category.id === action.payload.id)
        .map(category => {
          category.name = action.payload.name;
        });
      return newState;
    }
    default:
      return state;
  }
};
