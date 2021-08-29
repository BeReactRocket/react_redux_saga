import { createAction, createActions, handleActions } from 'redux-actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../lib/api';
import createRequestSaga from '../../lib/createRequestSaga';

// const prefix = 'users';

const GET_USERS = 'users/GET_USERS';
const GET_USERS_LOADING = 'users/GET_USERS_LOADING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
export const getUsers = createAction(GET_USERS);
// export const { getUsersPending, getUsersSuccess, getUsersFailure } =
//   createActions(GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_FAILURE, {
//     prefix,
//   });

const initialState = {
  loading: false,
  users: null,
  error: null,
};

const users = handleActions(
  {
    [GET_USERS_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,

      loading: action.payload.loading,
      users: action.payload.data,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: action.payload.loading,
      error: action.payload,
    }),
  },
  initialState,
);

export default users;

// saga
// function* getUsersSaga() {
//   try {
//     const users = yield call(api.getUsers);
//     yield put(getUsersSuccess(users.data));
//   } catch (error) {
//     yield put(getUsersFailure(error.response.data));
//   }
// }

function* watchGetUsers() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

export function* usersSaga() {
  yield all([fork(watchGetUsers)]);
}
