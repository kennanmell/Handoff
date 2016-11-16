import 'react-native';
import React from 'react';
import ViewRequests from '../View/ViewRequests';
import renderer from 'react-test-renderer';

// Ensures that the organization view requests page (ViewRequests) renders correctly.
it('renders correctly', () => {
  const tree = renderer.create(
    	<ViewRequests />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});