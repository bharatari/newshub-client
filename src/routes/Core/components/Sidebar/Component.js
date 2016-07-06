import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { navigationRoutes } from '../../utils/RouteUtils';

class Sidebar extends React.Component {
  currentRoute = (url) => {
    if (url === this.props.currentUrl) {
      return true;
    } else {
      return false;
    }
  }
  handleClick = (route, event) => {
    event.preventDefault();
    this.props.actions.pushState(null, route.url);
  }
  render() {
    var getRoutes = () => {
      var routes = [];
      navigationRoutes.forEach((route) => {
        let boundClick = this.handleClick.bind(this, route);
        routes.push(
          <li className={this.currentRoute(route.url) ? 'active' : ''} key={route.url}>
            <a href="#" onClick={boundClick}>{route.label}</a>
          </li>
        )
      });
      return routes;
    }
    return (
      <div className="sidebar sidebar-left collapse navbar-collapse" id="navbar-collapse">
        <ul className="nav nav-pills nav-stacked">
          {getRoutes()}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  currentUrl: state.router.location.pathname
});

const ActionCreators = {
  pushState
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
