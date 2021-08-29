import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';
import users, { usersSaga } from './users';

const rootReducer = combineReducers({ counter, users });

export default rootReducer;

export function* rootSaga() {
  yield all([counterSaga(), usersSaga()]);
}
