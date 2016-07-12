import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table } from 'components/';
import { Form } from './components';

export default class NewReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
    authenticated: PropTypes.bool,
  };
  componentDidMount() {
    this.props.actions.fetchDevices();
  }
  handleSubmit = (values) => {
    this.props.actions.createReservation(values);
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const button = classNames(
      'ui animated button inverted blue button-light',
      { loading: this.props.requestingCreateReservation }
    );

    const right = <button className={button} onClick={this.handleClick}>
                    <div className="visible content">SAVE</div>
                    <div className="hidden content">
                      <i className="checkmark icon"></i>
                    </div>
                  </button>;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Reservation" right={right}>
          <Form ref="form" remainingDevices={this.props.remainingDevices}
            requestingCreateReservation={this.props.requestingCreateReservation}
            onSubmit={this.handleSubmit} />
        </SidebarPage>
      </div>
    );
  }
}
