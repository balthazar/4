import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducer from 'reducers'
import devTools from 'middlewares/dev-tools'
import api from 'middlewares/api'

export default (history, initialState) => {

  const routing = routerMiddleware(history)
  const middlewares = [thunk, routing, api]

  const enhancers = compose(
    applyMiddleware(...middlewares),
    devTools
  )

  const store = createStore(reducer, initialState, enhancers)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store

}
