# wimea-mobile-application
This is a mobile application part of the RC2 WDR component of the wimea project. 
It is aimed at acting as a tool used to collect data from the weather station by the observers.
It provides an interface for the users to login, enter observation data and more form fields form data read
from the different weather stations. It also provides a component that alow users capture data while offline and later 
upload their results in the presence of internet.

# how do i get started
this project was developed using ionic version 1, angular js, php and json. Inorder to build this project, one has to install the
ionic development environmment dependenicies. Ionic is a framework for the developing mobile applications through use of web technologies

# Requirements
## Install node js
Whether you are using Windows, Linux or Mac the first step is to make sure you have Node.js installed on your machine. for more 
information visit <a href="https://nodejs.org/en/"> node js</a> download and install it.

## install ionic and cordova
ionic can be installed through node js package manager (npm). In your terminal write the command below
<p style="color:red">npm install -g cordova ionic</p>
Cordova is used to make our applications native ie run on android, windows and ios

## start an ionic project
To start an ionic project type the following command in your terminal
<p>ionic start projectname blank</p>
This will create an ionic project for you. Move into the project directory by typing this command
<p>cd projectname </>
<p>Unzip this project and paste the www in the project directory</p>

## Testing successfully
To test successfully run
<p>ionic serve --lab</p>
This will open the application in the browser. Otherwise then their is a problem

## installing plugins
This projects has required plugins for specific features. Add these plugins to the project through using this command
cordova plugin add \<plugin-name\>
<p>cordova-plugin-advanced-geolocation 1.1.0 "Cordova Advanced Geolocation Plugin - Android"</p>
<p>cordova-plugin-console 1.0.7 "Console"</p>
<p>cordova-plugin-device 1.1.5 "Device"</p>
<p>cordova-plugin-network-information 1.3.3 "Network Information"</p>
<p>cordova-plugin-splashscreen 4.0.2 "Splashscreen"</p>
<p>cordova-plugin-statusbar 2.2.2 "StatusBar"</p>
<p>cordova-plugin-whitelist 1.3.2 "Whitelist"</p>
<p>cordova-sqlite-storage 2.0.4 "Cordova sqlite storage plugin"</p>
<p>ionic-plugin-keyboard 2.2.1 "Keyboard"</p>

## success test
You should be able to see these screens
<table>
  <tr><td>![ScreenShot](/mobile application screen shots/Screenshot_20170710-163524.png)</td></tr>
  
</table>

# installation
tested on android 4.1+ and above



