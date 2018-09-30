//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _     from 'lodash';
import React from 'react';
import store from 'store';

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  tableBody() {
    
    function createRows() {
      let expenses = store.get('expenses');
      let rows     = [];
      _.forEach(expenses, function(expense, index){
          rows.push(
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.cost}</td>
              <td>{expense.recurrence}</td>
              <td>{expense.type}</td>
              <td>
                <button type="button" className="btn btn-danger btn-xs" >
                  <i className="fas fa-trash-alt fa-fw"></i>
                </button>
              </td>
            </tr>
          );
      });
      return rows;
    }

    return (            
      <tbody>
        {createRows()}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Recurrence</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          {this.tableBody()}
        </table>
      </div>
    );
  }

}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Component;

//-----------------------------------------------------------------------------//
