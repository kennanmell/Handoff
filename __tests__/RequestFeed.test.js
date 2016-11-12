import 'react-native';
import React from 'react';
import RequestFeed from '../View/RequestFeed';
import renderer from 'react-test-renderer';

// Ensures that the donator request feed page (RequestFeed) renders correctly.
it('renders correctly', () => {
  const tree = renderer.create(
    	<RequestFeed />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});