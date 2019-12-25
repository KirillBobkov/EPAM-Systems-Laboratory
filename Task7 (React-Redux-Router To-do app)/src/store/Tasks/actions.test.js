import {
  ADD_TODO, 
  CHECK_TODO, 
  DELETE_ITEMS, 
  EDIT_TODO, 
  MOVE_TODO,
  addTodoItem, 
  editTodoItem, 
  checkTodo, 
  deleteAllItemsOfThisCategory, 
  moveTaskToCategory
} from './actions';

describe('actions', () => {
  it('should create an action to add a category', () => {
    const value = 'Fanta';
    const categoryId = 'drinks';

    const action = {
      type: ADD_TODO,
      payload: {
        name: value,
        id: Date.now().toString(),
        categoryId,
        done: false
      }
    };
    expect(addTodoItem('Fanta', 'drinks')).toEqual(action);
  });

});
