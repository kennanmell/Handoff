import 'react-native';
import React from 'react';
import RequestMaker from '../View/RequestMaker';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    	<RequestMaker
    		onLogout={ () => {
    		}}
    		
    		onEditRequest={ () => {
    		}}
    		
    		onEditProfile={ () => {
    		}}
    	/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});