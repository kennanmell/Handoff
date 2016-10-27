# Handoff

Product Description

Handoff is a mobile application that bridges the communication gap between local organizations such as food banks and non-profits and community members looking to donate. The app allows organizations to post requests about general or specific needs, and then users can browse through this information through either a request feed or a map that displays requests at the location of the organization. A user might want to use it because it can keep them aware of the needs of organizations, and it provides an easy way to find a place where items to donate can be dropped off.

Installing Our Toolset for Andriod


--------------- For Mac:

React Native uses both Node.js and Watchman which can be installed with Homebrew

If Homebrew has not been installed, run 
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
in a command line. If this does not work, there are more installation instructions here:
https://github.com/Homebrew/brew/blob/master/docs/Installation.md#installation

------ Now that homebrew has been installed, you can install Node.js and Watchman with the following commands:

brew install node

brew install watchman

Note: It is possible that installing node will cause an error with user permissions when trying to install the sandbox. The only time we experienced this bug, the following two commands (after brew install node partially fails) solved the issue:

sudo chown -R $USER /usr/local

brew postinstall node -v
 
------- With Node and Watchman installed, you can now install React Native's command line interface with this command:

npm install -g react-native-cli

If you get a permission error, try using sudo: sudo npm install -g react-native-cli.

If you get an error like Cannot find module 'npmlog', try installing npm directly: curl -0 -L http://npmjs.org/install.sh | sudo sh

A bug was discovered where it would not finish the download on a home machine, but without any other commands it worked when run on the same machine but on a UW network.

------ Installing Andriod Studio

If Andriod Studio is not already on your machine, google it, download it, and install it. If you have already downloaded Andriod Studio, check that the latest SDK has been installed by going to Andriod Studio -> Preferences -> Appearance & Behavior -> System Settings -> Andriod SDK and checking that Andriod 7 has been installed.

You must then set up a home environment with the command:
export ANDROID_HOME=~/Library/Android/sdk

To avoid doing this every time, add these lines to ~/.bashrc:
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools

Andriod may fail to install the Android Virtual Device. The command "android adv" will open up a manager to display your ADVS.
If necissary, follow the instructions here:  https://developer.android.com/studio/run/managing-avds.html

-------------- For Linux or Windows:
Go to the following webpage and select Linux or Windows.
http://facebook.github.io/react-native/docs/getting-started.html


