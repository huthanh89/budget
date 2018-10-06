//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _          from 'lodash';
import moment     from 'moment';
import acc        from 'accounting'
import React      from 'react';
import store      from 'store';
import classNames from 'classnames'

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

function sumDate(dateIterator, type) {
  
  let expenses = store.get('expenses');
  let total = 0;

  expenses = _.filter(expenses, function(expense){
    if(type == 'total'){
      return true;
    }else{
      return expense.type == type;
    }
  });


  _.forEach(expenses, function(expense){
      total += recurrence(expense, dateIterator);
  });
  return total;
}

function iconClass(value) {
  return classNames('fas', 'fa-fw', 'fa-lg', {
    'fa-caret-down': value < 0,
    'text-danger':   value < 0,
    'fa-caret-up':   value > 0,
    'text-success':  value > 0
  });

}

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {

    let dailyTotal   = sumDate('daily', 'total');
    let weeklyTotal  = sumDate('weekly', 'total');
    let monthlyTotal = sumDate('monthly', 'total');
    let yearlyTotal  = sumDate('yearly', 'total');

    return (
      <div id="budget-container" className="text-center">

        <div className="row">

          <div className="col-md-6"> 
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Daily Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border border-secondary">
                <tr className="border border-secondary">
                  <td>Expense</td>
                  <td>{acc.formatMoney(sumDate('daily', 'expense'))}</td>
                </tr>
                <tr>
                  <td>Income</td>
                  <td>{acc.formatMoney(sumDate('daily', 'income'))}</td>
                </tr>
                <tr className="bg-secondary">
                  <td>Under/Over Budget</td>
                  <td>
                    <span>
                      {acc.formatMoney(dailyTotal)}
                    </span>
                    <i className={iconClass(dailyTotal)}></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Weekly Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border border-info">
                <tr className="border border-info">
                  <td>Expense</td>
                  <td>{acc.formatMoney(sumDate('weekly', 'expense'))}</td>
                </tr>
                <tr>
                  <td>Income</td>
                  <td>{acc.formatMoney(sumDate('weekly', 'income'))}</td>
                </tr>
                <tr className="bg-info">
                  <td>Under/Over Budget</td>
                  <td>
                    <span>
                      {acc.formatMoney(sumDate('weekly', 'total'))}
                    </span>
                    <i className={iconClass(weeklyTotal)}></i>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>

        </div>

        

        <div className="row">

          <div className="col-md-6"> 
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Monthly Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border border-warning">
                <tr className="border border-warning">
                  <td>Expense</td>
                  <td>{acc.formatMoney(sumDate('monthly', 'expense'))}</td>
                </tr>
                <tr>
                  <td>Income</td>
                  <td>{acc.formatMoney(sumDate('monthly', 'income'))}</td>
                </tr>
                <tr className="bg-warning">
                  <td>Under/Over Budget</td>
                  <td>
                    <span>
                      {acc.formatMoney(monthlyTotal)}
                    </span>
                    <i className={iconClass(monthlyTotal)}></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
          <div className="col-md-6">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Yearly Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border border-primary">
                <tr>
                  <td>Expense</td>
                  <td>{acc.formatMoney(sumDate('yearly', 'expense'))}</td>
                </tr>
                <tr className="border border-primary">
                  <td>Income</td>
                  <td>{acc.formatMoney(sumDate('yearly', 'income'))}</td>
                </tr>
                <tr className="bg-primary">
                  <td>Under/Over Budget</td>
                  <td>
                    <span>
                      {acc.formatMoney(sumDate('yearly', 'total'))}
                    </span>
                    <i className={iconClass(yearlyTotal)}></i>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>
        
        </div>

      </div>
    );
  }

}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Component;

//-----------------------------------------------------------------------------//
