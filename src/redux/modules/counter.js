import { createAction, createActions, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const prefix = 'count';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const { increase, decrease } = createActions(INCREASE, DECREASE, {
  prefix,
});

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState,
  { prefix },
);

export default counter;

// saga
const INCREASE_ASYNC = `${prefix}/INCREASE_ASYNC`;
const DECREASE_ASYNC = `${prefix}/DECREASE_ASYNC`;

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);
// export const { increaseAsync, decreaseAsync } = createActions(
//   INCREASE_ASYNC,
//   DECREASE_ASYNC,
//   { prefix },
// );

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}
