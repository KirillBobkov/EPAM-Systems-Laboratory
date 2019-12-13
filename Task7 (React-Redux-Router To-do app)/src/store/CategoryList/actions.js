export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CHECK_CATEGORY = 'CHECK_CATEGORY';

export const addCategory = (value) => ({
  type: ADD_CATEGORY,
  payload: {
    name: value,
    id: Date.now().toString()
  }
});

export const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  id
});

export const checkCategory = id => ({
  type: CHECK_CATEGORY,
  id
});
