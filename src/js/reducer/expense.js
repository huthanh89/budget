//-----------------------------------------------------------------------------//
// Reducer
//-----------------------------------------------------------------------------//

function reducer (state, action){

  switch (action.type){
    case 'EXPENSE_ADD': {
      return {
        count: state.count + 1
      }
    }
    case 'EXPENSE_REMOVE': {
      return {
        count: state.count - 1 
      }
    }
    default: {
      return {
        count: 0
      };
    }
  }
}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default reducer

//-----------------------------------------------------------------------------//