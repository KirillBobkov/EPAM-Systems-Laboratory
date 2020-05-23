export const ADD_TODO = 'ADD_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const DELETE_ITEMS = 'DELETE_ITEMS';
export const EDIT_TODO = 'EDIT_TODO';
export const MOVE_TODO = 'MOVE_TODO';

export const addTodoItem = (value, categoryId) => ({
  type: ADD_TODO,
  payload: {
    name: value,
    id: Date.now().toString(),
    categoryId,
    done: false
  }
});

export const editTodoItem = (value, id, description) => ({
  type: EDIT_TODO,
  payload: {
    name: value,
    id,
    description
  }
});

export const checkTodo = id => ({
  type: CHECK_TODO,
  id
});

export const deleteAllItemsOfThisCategory = id => ({
  type: DELETE_ITEMS,
  id
});

export const moveTaskToCategory = (id, categoryId) => ({
  type: MOVE_TODO,
  payload: {
    id,
    categoryId
  }
});
