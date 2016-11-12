import 'react-native';
import React from 'react';
import OrganizationEditor from '../View/OrgEditor';
import renderer from 'react-test-renderer';

// Rendering test for MapView, an unimplemented class. Should fail with syntax error.
it('renders correctly', () => {
  const tree = renderer.create(
    	<MapView
    		onTouch={ () => {
    		}}
    	/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});