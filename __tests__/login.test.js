import 'react-native';
import React from 'react';
import FacebookLoginPage from '../View/login';
import renderer from 'react-test-renderer';

// Ensures that the login page (FacebookLoginPage) renders correctly.
it('renders correctly', () => {
  const tree = renderer.create(
    	<FacebookLoginPage
    		onUserLogin={ () => {
    		}}
    		
    		onOrgLogin={ () => {
    		}}
    	/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});