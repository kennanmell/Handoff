import 'react-native';
import React from 'react';
import EditRequests from '../View/EditRequests';
import renderer from 'react-test-renderer';

// Ensures that the organization edit requests (EditRequests) renders correctly.
it('renders correctly', () => {
  const tree = renderer.create(
        <EditRequests
    		onClose={ () => {
    		}}
         />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});