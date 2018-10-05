//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _     from 'lodash';
import React from 'react';
import store from 'store';
import acc   from 'accounting'

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  constructor(props){
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(id) {
    this.props.remove(id);
  }

  tableBody() {

    var view = this;

    function createRows() {
      let expenses = store.get('expenses');
      let rows     = [];

      _.forEach(expenses, function(expense){
          let cost = expense.type=='expense'? -expense.cost : expense.cost;
          rows.push(
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{acc.formatMoney(cost)}</td>
              <td>{expense.recurrence}</td>
              <td>{expense.type}</td>
              <td>
                <button onClick={() => view.buttonClicked(expense.id)} type="button" className="btn btn-danger btn-xs" >
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
      <div id="entry-container">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pay</th>
              <th>Recur.</th>
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
