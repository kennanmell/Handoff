import 'react-native';
import React from 'react';
import ViewRequests from '../View/ViewRequests';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    	<ViewRequests />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});