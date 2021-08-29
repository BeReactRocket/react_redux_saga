import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../../lib/createRequestSaga';
import * as api from '../../lib/api';
import { all, fork, takeLatest } from 'redux-saga/effects';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_LOADING = 'posts/GET_POSTS_LOADING';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'posts/GET_POSTS_FAILURE';
export const getPosts = createAction(GET_POSTS);
const getPostsSaga = createRequestSaga(GET_POSTS, api.getPosts);
const initialState = {
  loading: false,
  posts: null,
  error: null,
};

const posts = handleActions(
  {
    [GET_POSTS_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [GET_POSTS_SUCCESS]: (state, action) => ({
      ...state,
      loading: action.payload.loading,
      posts: action.payload.data,
    }),
    [GET_POSTS_FAILURE]: (state, action) => ({
      ...state,
      loading: action.payload.loading,
      error: action.payload,
    }),
  },
  initialState,
);

export default posts;

// saga

function* watchGetPosts() {
  console.log('watchGetPosts');
  yield takeLatest(GET_POSTS, getPostsSaga);
}

export function* postsSaga() {
  yield all([fork(watchGetPosts)]);
}
