import { combineReducers } from 'redux';
import categoryReducer from './CategoryList';
import itemReducer from './TodoList';

// import { routerReducer } from 'react-router-redux';

export default combineReducers({
  categoryReducer,
  itemReducer
});
