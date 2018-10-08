//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import   _         from 'lodash';
import   store     from 'store';
import   uniqid    from 'uniqid';
import { connect } from 'react-redux';
import   Home      from '../component/home/layout';

//-----------------------------------------------------------------------------//

// The state arguments will be passed in from the Reducer.
// Return which state property to get updated by the component.

function mapStateToProps(state) {
    return state;
}
  
// Called once to map 'dispatch' to 'prop'.
// Dispatch will be called to change the state.

function mapDispatchToProps(dispatch) {
    return {
        
        add: function (expense){

            let expenses = store.get('expenses')!=null? store.get('expenses') : [];

            expense.id = uniqid();

            let entry = expense;

            expenses.push(entry);

            // Store data to local storage.
        
            store.set('expenses', expenses);
        
            return dispatch({
                type: 'EXPENSE_ADD'
            })
        },

        remove: function (id){

            let expenses = _.filter(store.get('expenses'), function(expense){
                return expense.id != id
            });
            store.set('expenses', expenses);
            return dispatch({
                type: 'EXPENSE_REMOVE'
            })
        }
    }
}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

//-----------------------------------------------------------------------------//