import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../redux/modules/loading';

export default function createRequestSaga(type, request) {
  const LOADING = `${type}_LOADING`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put({ type: LOADING, payload: true });
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: { data: response.data, loading: false },
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }
  };
}
