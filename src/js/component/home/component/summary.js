//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _      from 'lodash';
import moment from 'moment';
import acc    from 'accounting'
import React  from 'react';
import store  from 'store';

//-----------------------------------------------------------------------------//

function recurrence(expense, iterator) {

  const recur = {
    'daily':   { iterator: 'd', value: 1   },
    'weekly':  { iterator: 'w', value: 7   },
    'monthly': { iterator: 'M', value: 30  },
    'yearly':  { iterator: 'Y', value: 365 }
  }

  let date          = moment(expense.date);
  let endDate       = moment(expense.date).add(1, recur[iterator].iterator);
  let total         = 0;
  let recurIterator = recur[expense.recurrence].iterator;
  let cost          = parseFloat(expense.cost);

  if(expense.type=='expense'){
    cost *= -1;
  }

  let expenseRecurValue = recur[expense.recurrence].value;
  let iteratorValue     = recur[iterator].value;

  if(expenseRecurValue > iteratorValue){
    return (iteratorValue / expenseRecurValue) * cost;
  }
  else{
    do{
      total += cost;
      date.add(1, recurIterator);
    }
    while(date.isBefore(endDate))
  
    return total;
  }

}

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  constructor(props){
    super(props);
  }

  tableBody() {

    let expenses = store.get('expenses');

    function sumDate(dateIterator) {
      let total = 0;
      _.forEach(expenses, function(expense){
          total += recurrence(expense, dateIterator);
      });
      return total;
    }

    return (            
      <tbody>
        <tr>
          <td>Hourly</td>
          <td>{acc.formatMoney(sumDate('daily')/24)}</td>
        </tr>
        <tr>
          <td>Daily</td>
          <td>{acc.formatMoney(sumDate('daily'))}</td>
        </tr>
        <tr>
          <td>Weekly</td>
          <td>{acc.formatMoney(sumDate('weekly'))}</td>
        </tr>
        <tr>
          <td>Monthly</td>
          <td>{acc.formatMoney(sumDate('monthly'))}</td>
        </tr>
        <tr>
          <td>Yearly</td>
          <td>{acc.formatMoney(sumDate('yearly'))}</td>
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div id="summary-container">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Recurrence</th>
              <th>Net Income</th>
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
