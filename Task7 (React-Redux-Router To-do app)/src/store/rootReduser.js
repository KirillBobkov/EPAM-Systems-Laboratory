import { combineReducers } from 'redux';
import categoryReducer from './CategoryList';
import itemReducer from './TodoList';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  categoryReducer,
  itemReducer
});
