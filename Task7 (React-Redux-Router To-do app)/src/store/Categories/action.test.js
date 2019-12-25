
import {
  ADD_CATEGORY, DELETE_CATEGORY, CHANGE_NAME_OF_CATEGORY,
  addCategory, deleteCategory, editCategoryItem, addSubCategory
} from './actions';

describe('actions', () => {
  it('should create an action to add a category', () => {
    const text = 'Goals';
    const action = {
      type: ADD_CATEGORY,
      payload: {
        name: text,
        id: Date.now().toString(),
        parentId: ''
      }
    };
    expect(addCategory(text)).toEqual(action);
  });

  it('should create an action to delete a category', () => {
    const id = 'drinksTogether';
    const parentId = 'drinks';

    const action = {
      type: DELETE_CATEGORY,
      payload: {
        id,
        parentId
      }
    };
    expect(deleteCategory('drinksTogether', 'drinks')).toEqual(action);
  });

  it('should create an action to edit a category', () => {
    const value = 'Potatoes';
    const id = 'vegetables';

    const action = {
      type: CHANGE_NAME_OF_CATEGORY,
      payload: {
        name: value,
        id
      }
    };
    expect(editCategoryItem('Potatoes', 'vegetables')).toEqual(action);
  });

  it('should create an action to addsubcategory', () => {
    const value = 'Potatoes';
    const id = 'drinks';

    const action = {
      type: ADD_CATEGORY,
      payload: {
        parentId: id,
        id: Date.now().toString(),
        name: `Sub${value}`
      }
    };
    expect(addSubCategory('drinks', 'Potatoes')).toEqual(action);
  });
});
