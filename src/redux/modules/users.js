import { createActions, handleActions } from 'redux-actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../lib/api';

const prefix = 'users';

const GET_USERS_PENDING = 'GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const { getUsersPending, getUsersSuccess, getUsersFailure } =
  createActions(GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_FAILURE, {
    prefix,
  });

const initialState = {
  loading: false,
  users: null,
  error: null,
};

const users = handleActions(
  {
    [GET_USERS_PENDING]: (state) => ({ ...state, loading: true }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default users;

// saga
function* getUsersSaga() {
  try {
    const users = yield call(api.getUsers);
    yield put(getUsersSuccess(users.data));
  } catch (error) {
    yield put(getUsersFailure(error.response.data));
  }
}

function* watchGetUsers() {
  yield takeLatest(`${prefix}/${GET_USERS_PENDING}`, getUsersSaga);
}

export function* usersSaga() {
  yield all([fork(watchGetUsers)]);
}
