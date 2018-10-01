//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import React from 'react';

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewIndex: 0
    };

    this.itemClickedPortfolio = this.itemClickedPortfolio.bind(this);
    this.itemClickedResume    = this.itemClickedResume.bind(this);
    this.itemClickedContact   = this.itemClickedContact.bind(this);
  }

  render() {

    var viewIndex = this.state.viewIndex;

    function isActive(itemIndex){
      return itemIndex == viewIndex? true:false;
    }

    function classAttribute (active){
      if(active){
        return "nav-item nav-link active"
      }else{
        return "nav-item nav-link"
      }
    }

    function styleAttribute (active){
      if(active){
        return {
          ':hover': {
            'background': 'yellow'
          },
          'fontWeight': '500',
          'cursor':      'pointer'
        }
      }else{
        return {
          'fontWeight': 'normal',
          'cursor':      'pointer'
        }
      }
    }

    // TODO: remove className d-none to show contact list item.

    return (
      <nav className="navbar navbar-expand-md border-bottom bg-white">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span>
              <i className="fas fa-bars fa-lg"></i>
            </span>
          </button>
          <a className="navbar-brand" href="#" data-toggle="modal" data-target="#contactModal">
                <img src="asset/logo.jpg" alt=""/>
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="nav navbar-nav ml-auto">
              <li className={classAttribute(isActive(0))} style={styleAttribute(isActive(0))} onClick={this.itemClickedPortfolio}>
                <a>
                  <i className="fas fa-folder-open fa-fw fa-lg"></i> <span >Portfolio</span>
                </a>
              </li>
              <li className={classAttribute(isActive(1))} style={styleAttribute(isActive(1))} onClick={this.itemClickedResume}>
                <a>
                  <i className="fas fa-print fa-fw fa-lg"></i> <span>Resume PDF</span>
                </a>
              </li>
              <div className="d-none">
                <li className={classAttribute(isActive(2)) + " hide"} style={styleAttribute(isActive(2))} onClick={this.itemClickedContact}>
                  <a>
                    <i className="fas fa-user fa-fw fa-lg"></i> <span>Contact Me</span>
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  itemClickedPortfolio() {
    this.setState({
      viewIndex: 0
    });
    this.props.updateView(0);
  }

  itemClickedResume() {
    this.setState({
      viewIndex: 1
    });
    this.props.updateView(1);
  }

  itemClickedContact() {
    this.setState({
      viewIndex: 2
    });
    this.props.updateView(2);
  }
}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Layout;

//-----------------------------------------------------------------------------//
