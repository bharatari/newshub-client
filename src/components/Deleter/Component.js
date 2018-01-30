import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Modal } from 'components/';
import access from 'utils/access';
import _ from 'lodash';

export default class Deleter extends React.Component {
  state = {
    showModal: false,
  };
  componentWillReceiveProps(nextProps) {
    // if requesting then deleted
    // navigate away
  }
  deleteObject = () => {
    this.props.delete(this.props.id);
  };
  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };
  render() {
    const { roles } = this.props;
    const canDelete = access.has(roles, `${this.props.model}:delete`);

    return (   
      <div>
        { canDelete ? (
            <button className="ui animated button red inverted button-light" onClick={this.handleClick}>
              <div className="visible content">DELETE</div>
              <div className="hidden content">
                <i className="trash icon"></i>
              </div>
            </button>
          ) : null
        }

        <Modal id="deleter-modal" show={this.state.showModal} handleConfirmation={this.deleteObject} header="Are you sure?">
          Are you sure you want to delete this? This action is not reversible.
        </Modal>
      </div>
    );
  }
}
