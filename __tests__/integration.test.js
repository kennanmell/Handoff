import 'react-native';
import React from 'react';
import FacebookLoginPage from '../View/login';
import renderer from 'react-test-renderer';

// Test to login, post a new request, (delete the request), and logout.
it("post-request", function* (driver, done) {

	// automatically log the test user in
    yield bootstrap().login().launch(driver);

	// Ensure we're on the login page
	yield driver.elementById('orgLoginButton');
	
    // tap the upper right to create a new post
    yield driver.elementById('orgLoginButton').click();
    
    // ensure we're on the logged-in org screen
    yield driver.elementById('logoutButton');
    
    // Set the request text fields
    yield driver.elementById('titleInput').setText("Int-test Title");
    yield driver.elementById('detailsInput').setText("Auto-generated request");
    yield driver.elementById('keywordsInput').setText("none");
    
    yield driver.elementById('submitButton').click();
    
    // TODO: delete request so it doesn't appear on donator feeds
    
    // Log out
    yield driver.elementById('logoutButton').click();
    
	// Ensure we're on the login page
	yield driver.elementById('orgLoginButton');
    
    done();
});
