import axios from 'axios'
import { noop } from 'lodash'

import { startLoader, stopLoader } from 'actions/loaders'

export default store => next => action => {

  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const { dispatch, getState } = store
  const state = getState()
  const prefix = action.type.split(':')[1]

  const {
    url,
    method = 'get',
    data,
    query,
    headers,
    loaderName = prefix,
    loaderData = true,
    shouldFetch,
    onSuccess = noop,
    onError = noop,
    onSuccessAfterDispatch = noop,
    onErrorAfterDispatch = noop,
    extra,
  } = action.payload

  if (shouldFetch && !shouldFetch(state)) { return }
  const urlPrefix = !process.env.BROWSER ? 'http://localhost:3000' : ''

  const r = {
    url: `${urlPrefix}/api${url}`,
    method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  }

  if (data) {
    r.data = data
  }

  if (query) {
    r.params = query
  }

  dispatch(startLoader(loaderName, loaderData))

  return axios.request(r)
    .then(({ data }) => {
      const response = extra ? { data, extra } : data

      try {
        onSuccess(response, dispatch)
        dispatch({ type: `${prefix}_SUCCESS`, payload: response })
        onSuccessAfterDispatch(response, dispatch)
      } catch (e) {
        console.error(e.stack) // eslint-disable-line
      }

      return { success: response }
    })
    .catch(err => {
      console.error(err) // eslint-disable-line
      onError(err.response, dispatch)
      dispatch({ type: `${prefix}_ERROR`, payload: err.response })
      onErrorAfterDispatch(err.response, dispatch)
      return { error: err.response }
    })
    .then(result => {

      dispatch(stopLoader(loaderName))

      // Ensure the promise throw
      if (result.error) {
        throw result.error
      }

      return result.success
    })

}
