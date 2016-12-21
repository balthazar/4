import { handleActions } from 'redux-actions'

const initialState = {

  boards: [],
  threads: [],

  watch: {},

}

export default handleActions({

  SELECT_BOARD: state => ({ ...state, threads: [] }),

  TOGGLE_WATCH: (state, { payload: id }) => ({
    ...state,
    watch: {
      ...state.watch,
      [id]: !state.watch[id],
    },
  }),

  FETCH_BOARDS_SUCCESS: (state, { payload: boards }) => ({ ...state, boards }),
  FETCH_BOARD_SUCCESS: (state, { payload: threads }) => ({ ...state, threads }),

}, initialState)
