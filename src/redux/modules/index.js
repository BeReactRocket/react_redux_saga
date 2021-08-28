import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';

const rootReducer = combineReducers({ counter });

export default rootReducer;

export function* rootSaga() {
  yield all([counterSaga()]);
}
