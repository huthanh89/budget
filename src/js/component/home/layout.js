//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import   React            from 'react';
import   Expense          from './component/expense'
import   Display          from './component/display'
import   Table            from './component/table'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Expense Calculator</h5>
            <h6 className="card-subtitle mb-2 text-muted">Add an expense.</h6>
            <Expense {...this.props}/>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Table {...this.props}/>
          </div>
        </div>


        <div className="card">
          <div className="card-body">


            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item">
                <a className="nav-link active" href="#">Cost</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Income</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Total</a>
              </li>
            </ul>

            <Display/>
          </div>
        </div>

        <ToastContainer/>

      </div>
    );
  }
}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Layout;

//-----------------------------------------------------------------------------//
