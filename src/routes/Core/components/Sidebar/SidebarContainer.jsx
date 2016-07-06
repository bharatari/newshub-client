import React from 'react';

export default class SidebarContainer extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        <h1 className="sidebar-container-header">{this.props.header}</h1>
        {this.props.children}
      </div>
    )
  }
};
