//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import { combineReducers } from 'redux'
import   expenseReducer    from './expense.js'

//-----------------------------------------------------------------------------//
// Reducer
//-----------------------------------------------------------------------------//

const rootReducer = combineReducers({
  expenseReducer
})

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default rootReducer

//-----------------------------------------------------------------------------//