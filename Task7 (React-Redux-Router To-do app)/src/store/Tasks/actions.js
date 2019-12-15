export const ADD_TODO = 'ADD_TODO';
export const FIND_TODO = 'FIND_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const DELETE_ITEMS = 'DELETE_ITEMS';

export const addTodoItem = (value, categoryId) => ({
  type: ADD_TODO,
  payload: {
    name: value,
    id: Date.now().toString(),
    categoryId
  }
});

export const checkTodo = id => ({
  type: CHECK_TODO,
  id
});

export const findTodoItem = value => ({
  type: FIND_TODO,
  payload: value
});

export const deleteAllItemsOfThisCategory = id => ({
  type: DELETE_ITEMS,
  id
});
