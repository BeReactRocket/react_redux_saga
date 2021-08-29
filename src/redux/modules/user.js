import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../lib/api';
import { startLoading } from './loading';

const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const getUsers = createAction(GET_USER_PENDING);

const initialState = {
  loading: false,
  users: null,
  error: null,
};

const user = handleActions(
  {
    [GET_USER_PENDING]: (state) => ({ ...state, loading: true }),
    [GET_USER_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      users: action.payload,
    }),
    [GET_USER_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
);

export default user;

// saga

// const GET_USER_SAGA = 'GET_USER_SAGA';
// export const getUserSaga = createAction(GET_USER_SAGA);

function* getUserSaga() {
  yield put(startLoading(GET_USER_PENDING));
  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USER_SUCCESS,
      payload: users.data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_FAILURE,
      payload: error,
      error: true,
    });
  }
}

export function* userSaga() {
  yield takeLatest(GET_USER_PENDING, getUserSaga);
}
