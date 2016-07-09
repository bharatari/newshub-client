import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname
});

const actionCreators = {
  ...routeActions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
