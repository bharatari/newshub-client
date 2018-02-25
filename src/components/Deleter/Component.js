import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import access from 'utils/access';
import _ from 'lodash';
import { Button, Modal } from 'antd';

export default class Deleter extends React.Component {
  componentWillReceiveProps(nextProps) {
    // if requesting then deleted
    // navigate away
  }
  handleClick = () => {
    let self = this;

    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This action is irreversible.',
      onOk() {
        self.props.delete(self.props.id);
      },
    })
  };
  render() {
    const { roles } = this.props;
    const canDelete = access.has(roles, `${this.props.model}:delete`);

    return (   
      <div>
        { canDelete ? <Button type="danger" onClick={this.handleClick} ghost>Delete</Button> : null }
      </div>
    );
  }
}
