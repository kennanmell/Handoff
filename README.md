# Handoff

Product Description

Handoff is a mobile application that bridges the communication gap between local organizations such as food banks and non-profits and community members looking to donate. The app allows organizations to post requests about general or specific needs, and then users can browse through this information through either a request feed or a map that displays requests at the location of the organization. A user might want to use it because it can keep them aware of the needs of organizations, and it provides an easy way to find a place where items to donate can be dropped off.

Installing Our Toolset for Andriod

Go to the following webpage and select Mac/Linux/Windows and Android, then follow the instructions to download Node/Watchman/ReactNative
http://facebook.github.io/react-native/docs/getting-started.html

--------------- For Mac:

Note: It is possible that installing node will cause an error with user permissions when trying to install the sandbox. The only time we experienced this bug, the following two commands (after "brew install node" partially fails) solved the issue:

sudo chown -R $USER /usr/local

brew postinstall node -v

-------------- How to download our software:

In the opening window of Android studio, for the first time select Check out project from Version Control -> Github. Otherwise, just open the existing project. Log in to github and choose the repository https://github.com/kennanmell/Handoff.git. This assumes we have already added said person to our project.

-------------- How to run our software:

Once the 

-------------- How to use our software:
There are two seperate users for our app, one representing an organization and one representing a community memeber.

Organization: Upon logging in using their organizations username/passowrd, the app will display a Create Request button will take the user to a display where they can title their request, add keywords, and add a description, and then post the request to our request database. The organization should also have all the functionality of the community member. Organizations will be given a username/password by us until we design an automatic authentication system.

Community Member: Users can log in through connecting Handoff to their Facebook. They can then select to view organization's requests either through a feed or a map and switch between them by pressing the button that represent the mode that the user is not already using. Alternatively, they can search for specific keywords through or search feature. Once they find an organization through some method, they can click on that organizations name to be taken to the organizations page, which the user can then subscribe to.

--------------- How to report a bug:
To report a bug go to this webpage: https://github.com/kennanmell/Handoff/issues/new
Please note that you must log in to a Github account to report a bug. If you do not have one, I would make one.

We would ask that any bug report contain certain information:

Overview: 

---- a synopsis of the overall bug; basically a title

---- a more detailed description that talks about the issue and a potentially solution to it.

Routing Information:

---- Category: As specific information as to what compontent displayed this issue.

---- Version: The release of the product that the bug was experienced on.

---- Regression version: What version did not have this issue.

---- Severity: Indicate the severity of the issue.

Test Case: Give as much info as possible of the situation of the test case

---- Operating system/ Hardware: specify the platform

---- Steps to reproduce: Outline steps to reproduce this problem.

---- Expected result: What should have happened if no bug was present

---- Actual result: What did happen given this test case

Contact Information

---- Information that will allow us to contact you to either clarify some information in the bug report or provide an update
