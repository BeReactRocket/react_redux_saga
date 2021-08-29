import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';
import users, { usersSaga } from './users';
import posts, { postsSaga } from './posts';

const rootReducer = combineReducers({ counter, users, posts });

export default rootReducer;

export function* rootSaga() {
  yield all([counterSaga(), usersSaga(), postsSaga()]);
}
