export const ADD_TODO = 'ADD_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FIND_TODO = 'FIND_TODO';

export const addCategory = value => ({
  type: ADD_TODO,
  payload: {
    name: value,
    id: Date.now()
  }
});

export const addTodoItem = value => ({
  type: ADD_TODO,
  payload: {
    name: value,
    id: Date.now().toString(),
    categoryId: (Date.now() + 30).toString()
  }
});

export const checkTodo = id => ({
  type: CHECK_TODO,
  id
});

export const deleteCategory = id => ({
  type: DELETE_TODO,
  id
});

export const findTodoItem = value => ({
  type: FIND_TODO,
  payload: value
});
