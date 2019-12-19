export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CHANGE_NAME_OF_CATEGORY = 'CHANGE_NAME_OF_CATEGORY';
export const ADD_SUBCATEGORY = 'ADD_SUBCATEGORY';
const uuidv1 = require('uuid/v1');

export const addCategory = (value) => ({
  type: ADD_CATEGORY,
  payload: {
    name: value,
    id: uuidv1(),
    parentId: ''
  }
});

export const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  id
});

export const editCategoryItem = (value, id) => ({
  type: CHANGE_NAME_OF_CATEGORY,
  payload: {
    name: value,
    id
  }
});

export const addSubCategory = (id, name) => ({
  type: ADD_CATEGORY,
  payload: {
    parentId: id,
    id: uuidv1(),
    name: `Sub-${name}`
  }
});
