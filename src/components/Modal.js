import React, { PropTypes } from 'react';
import classNames from 'classnames';

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
    this.setup(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // TODO Migrate to semantic UI react
    if (!this.state.show && nextProps.show) {
      $('#' + this.props.id).modal('refresh');
      $('#' + this.props.id).modal('show');

      this.setState({
        show: true,  
      });
    } else if (this.state.show && !nextProps.show) {
      $('#' + this.props.id).modal('hide');

      this.setState({
        show: false,
      });
    }
  }
  setup = (props) => {
    $('#' + props.id).modal({
      transition: 'scale',
      closable: false,
      onDeny: () => {
        this.setState({
          show: false,
        });
      },
      onApprove: () => {
        props.handleConfirmation();
        this.setState({
          show: true,
        })
      },
    });
  };
  render() {
    const actions = (
      <div className="actions">
        <div className="ui black deny button">
          {this.props.cancelText}
        </div>
        <div className="ui positive right labeled icon button">
          {this.props.confirmationText}
          <i className="checkmark icon"></i>
        </div>
      </div>
    );
    const close = (
      <div className="actions">
        <div className="ui black deny button button-light" onClick={this.props.hideModal}>
          {this.props.cancelText}
        </div>
      </div>
    );
    const modalClasses = classNames(
      'ui modal',
      { 'long': this.props.scrollable }
    );

    return (
      <div id={this.props.id} className={modalClasses}>
        <div className="header">
          {this.props.header}
        </div>
        <div className="content">
          {this.props.children}
        </div>
        { this.props.hideActions ? close : actions }
      </div>
    );
  }
}
