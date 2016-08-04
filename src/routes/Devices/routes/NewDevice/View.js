import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Response } from 'components/';
import { Form } from './components';

export default class NewReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetCreateDevice();
  }
  handleSubmit = (values) => {
    this.props.actions.createDevice(values);
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const button = classNames(
      'ui animated button inverted button-light',
      { loading: this.props.requesting }
    );
    const disable = this.props.requesting || this.props.device;
    const loading = this.props.requesting;

    const right = <button className={button} disabled={disable}
                    onClick={this.handleClick}>
                    <div className="visible content">SAVE</div>
                    <div className="hidden content">
                      <i className="checkmark icon"></i>
                    </div>
                  </button>;
    const message = "Your device has been created.";

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Device" right={right} loading={loading} user={this.props.user}>
          <Response error={this.props.error} response={this.props.device}
            successHeader={message} />
          <Form ref="form" onSubmit={this.handleSubmit} />
        </SidebarPage>
      </div>
    );
  }
};
