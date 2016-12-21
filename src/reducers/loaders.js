import { handleActions } from 'redux-actions'

export default handleActions({

  START_LOADER: (state, { payload: loaderName }) => ({ ...state, [loaderName]: true }),
  STOP_LOADER: (state, { payload: loaderName }) => ({ ...state, [loaderName]: false }),

}, {})
