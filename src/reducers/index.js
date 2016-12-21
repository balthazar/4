import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import main from './main'
import loaders from './loaders'
import config from './config'

export default combineReducers({
  main,
  config,
  loaders,
  routing,
})
