import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router, withRouter } from 'react-router';

import Footer from './index';

test('Outputs the expected tree', () => {
  const Component = withRouter(Footer);
  const component = renderer.create(<Router><Component /></Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
