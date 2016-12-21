import { createAction } from 'redux-actions'

export const fetchBoards = createAction('API:FETCH_BOARDS', () => ({
  url: '/boards',
}))

export const fetchBoard = createAction('API:FETCH_BOARD', boardName => ({
  url: `/boards/${boardName}`,
  loaderName: 'fetchingBoard',
}))

export const toggleWatch = createAction('TOGGLE_WATCH')
