import React, { PropTypes } from 'react';

export default class Modal extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    header: PropTypes.string,
    cancelText: PropTypes.string,
    confirmationText: PropTypes.string,
    show: PropTypes.bool,
    handleConfirmation: PropTypes.func,
  };
  state = {
    show: false,
  };
  componentDidMount() {
    $('#' + this.props.id).modal({
      closable: false,
      onDeny: () => {
        this.setState({
          show: false,
        });
      },
      onApprove: () => {
        this.props.handleConfirmation();
        this.setState({
          show: true,
        })
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.show && nextProps.show) {
      $('#' + this.props.id).modal('show');
      this.setState({
        show: true,  
      });
    } else if (this.state.show && !nextProps.show) {
      $('#' + this.props.id).modal('hide');
      this.setState({
        show: false,
      })
    }
  }
  render() {
    const actions = 
      <div className="actions">
        <div className="ui black deny button">
          {this.props.cancelText}
        </div>
        <div className="ui positive right labeled icon button">
          {this.props.confirmationText}
          <i className="checkmark icon"></i>
        </div>
      </div>;

    return (
      <div id={this.props.id} className="ui modal">
        <div className="header">
          {this.props.header}
        </div>
        <div className="content">
          {this.props.children}
        </div>
        { this.props.hideActions ? null : actions }
      </div>
    );
  }
}
