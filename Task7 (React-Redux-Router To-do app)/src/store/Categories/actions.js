export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

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
