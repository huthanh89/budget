//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import   _                from 'lodash';
import   React            from 'react';
import   classNames       from 'classnames';
import   Expense          from './component/expense';
import   Display          from './component/display';
import   Entry            from './component/entry';
import   Summary          from './component/summary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = _.assignIn(this.state, {
      viewIndex: 0
    });

    this.itemClicked = this.itemClicked.bind(this);

  }

  itemClicked(index){
    this.setState({
      viewIndex: index
    });
  }
  
  itemClasses(index) {
    return classNames('nav-link', {
      active: this.state.viewIndex==index
    });
  }

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
            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item" onClick={()=>this.itemClicked(0)}>
                <a className={this.itemClasses(0)}>
                  <i className="fas fa-chart-line fa-fw mr-1"></i> 
                  <span>Total</span>
                </a>
              </li>
              <li className="nav-item" onClick={()=>this.itemClicked(1)}>
                <a className={this.itemClasses(1)}>
                  <i className="fas fa-credit-card fa-fw mr-1"></i> 
                  <span>Expense</span>
                </a>
              </li>
              <li className="nav-item" onClick={()=>this.itemClicked(2)}>
                <a className={this.itemClasses(2)}>
                  <i className="fas fa-hand-holding-usd fa-fw mr-1"></i> 
                  <span>Income</span>
                </a>
              </li>
            </ul>
            <Display viewIndex={this.state.viewIndex}/>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Summary</h5>
            <Summary {...this.props}/>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Entries</h5>
            <Entry {...this.props}/>
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
