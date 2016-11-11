import 'react-native';
import React from 'react';
import OrganizationEditor from '../View/OrgEditor';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    	<OrganizationEditor
    		onSave={ () => {
    		}}
    	/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});