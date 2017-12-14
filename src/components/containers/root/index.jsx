import GoogleAnalytics from 'react-ga';
import has from 'lodash/has';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { CLIENT, SERVER } from 'constants';

import App from 'components/containers/app';

export default class Root extends Component {
  onUpdate = () => {
    const { store, type } = this.props;
    if (type !== SERVER) {
      const state = store.getState();
      if (has(state, 'router.pathname')) {
        GoogleAnalytics.pageview(state.router.pathname);
      }
    }
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  }
}

Root.defaultProps = {
  type: CLIENT,
};

Root.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  type: PropTypes.string,
};
