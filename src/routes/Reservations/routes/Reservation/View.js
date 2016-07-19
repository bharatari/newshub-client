import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading } from 'components/';
import { Admin, Devices, Content } from './components';

export default class ReservationView extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.fetchReservation(this.props.id);
  }
  handleClick = () => {
    this.props.actions.push('/app/reservation/new');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedReservation && !nextProps.requestingUpdateReservation) {
      if (!this.state.updated) {
        this.props.actions.fetchReservation(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateReservation) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { reservation, requestingReservation, 
            actions, updateError, updatedReservation,
            requestingUpdateReservation, currentUrl, user } = this.props;

    const response = () => {
      if (updateError) {
        return <div className="ui negative message">
                <div className="header">
                  Whoops, something went wrong there.
                </div>
              </div>
      } else if (updatedReservation) {
        return <div className="ui success message">
                <div className="header">
                  You successfully updated this reservation.
                </div>
              </div>
      } else {
        return null;
      }
    };

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Reservation" loading={requestingReservation || requestingUpdateReservation}
          user={this.props.user}>
          <div>
            {response()}
            { 
              reservation ? 
              <Content reservation={reservation} actions={actions} user={user} /> :
              <TextLoading loading={requestingReservation} /> 
            }
          </div>
        </SidebarPage>
      </div>
    );
  }
}
