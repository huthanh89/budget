//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import React   from 'react';
import Expense from './component/expense'
import Display from './component/display'
import Table   from './component/table'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Expense/>
        <Table/>
        <Display/>
        <ToastContainer />
      </div>
    );
  }
}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Layout;

//-----------------------------------------------------------------------------//
