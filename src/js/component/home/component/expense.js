//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import $         from 'jquery';
import React     from 'react';
import store     from 'store';

import { toast } from 'react-toastify';
import { css }   from 'glamor';

import 'react-toastify/dist/ReactToastify.css';

//-----------------------------------------------------------------------------//

function showToast(message){
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    className: css({
      opacity: '0.9'
    }),
    bodyClassName: css({
      fontSize:  '21px',
      textAlign: 'center'
    })
  });
}

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <p>{this.props.count}</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="expense-name" className="col-md-3 col-form-label">Name</label>
              <div className="col-md-9">
                <input type="text" className="form-control" id="expense-name" placeholder="Enter name" required/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="expense-cost" className="col-md-3 col-form-label">Cost</label>
              <div className="col-md-9">
                <input type="text" className="form-control" id="expense-cost" placeholder="$0.00" required/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="expense-recurrence" className="col-md-3 col-form-label">
                Recurrence
              </label>  
              <div className="col-md-9">
                <select className="custom-select" id="expense-recurrence" defaultValue="monthly">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            
            <div className="form-group row">
              <label htmlFor="expense-type" className="col-md-3 col-form-label">
                Type
              </label>  
              <div className="col-md-9">
                <select className="custom-select" id="expense-type" defaultValue="expense">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary float-right" >
              <i className="fas fa-plus fa-fw"></i>
              <span>Add</span>
            </button>
      
          </form>
        </div>
      </div>
    );
  }

  handleSubmit(e) {

    e.preventDefault();

    let expense = {
      date:       new Date(),
      name:       $('#expense-name').val(),
      cost:       $('#expense-cost').val(),
      recurrence: $('#expense-recurrence').val(),
      type:       $('#expense-type').val()
    }

    // Let redux know we should update the state.

    this.props.add(expense);

    // Show toast, to show user we've successfully added an entry.

    showToast("Successfully Added!");
  }

}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Component;

//-----------------------------------------------------------------------------//
