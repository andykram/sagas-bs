import PropTypes from 'prop-types';
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router';

import Header from 'components/header';
import Footer from 'components/footer';

import routes from 'routes';

export default function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <main>
        <Header />
        <div className="container mt-4">
          <Switch>
            { routes.map(r => <Route path={r.path} component={r.page} exact />) }
          </Switch>
        </div>
        <Footer />
      </main>
    </ConnectedRouter>
  );
}

App.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  history: PropTypes.object.isRequired,
};
