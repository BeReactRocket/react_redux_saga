import { createActions, handleActions } from 'redux-actions';

const prefix = 'loader';

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const { pending, success, failure } = createActions(
  PENDING,
  SUCCESS,
  FAILURE,
  {
    prefix,
  },
);

const initialState = {
  loading: false,
  error: null,
};

const loader = handleActions(
  {
    [PENDING]: (state) => ({ ...state, loading: true }),
    [SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default loader;
