import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Response, Notifications } from 'components/';
import { Menu } from './components';

const main = classNames(
  'twelve wide phone eight wide tablet four wide computer column',
  classes.main
);

export default class SwitcherView extends React.Component {
  static propTypes = {
    requestingUpdateUser: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.any,
    response: PropTypes.any,
    actions: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetUpdateUser();
  }
  handleClick = (organization) => {
    this.props.actions.switchOrganization(this.props.user.id, organization.id);
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.requestingUpdateUser && nextProps.response) {
      if (nextProps.query.next) {
        this.props.actions.push(nextProps.query.next);
      } else {
        this.props.actions.push('/');
      }
    }
  }
  render() {
    const organization = this.props.user.currentOrganization;

    const styles = {
      backgroundImage: 'url(' + organization.meta.background + ')',
    };

    return (
      <div>
        <Notifications loading={this.props.requestingUpdateUser} />
        <div className={classes.background} style={styles}>
          <div className="ui container">
            <div className="ui middle aligned center aligned grid">
              <div className={main}>
                <h2 className={classes.brand}>NewsHub</h2>
                <p className={classes.description}>Switch organizations.</p>
                <Response error={this.props.error} />
                <Menu organizations={this.props.user.organizations} onClick={this.handleClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
