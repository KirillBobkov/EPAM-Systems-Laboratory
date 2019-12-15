import { combineReducers } from 'redux';
import categoryReducer from './Categories';
import itemReducer from './Tasks';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  categoryReducer,
  itemReducer
});
