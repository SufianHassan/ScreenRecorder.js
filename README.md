# ScreenRecorder.js
Plugin for FireFox that allows the user to create a testing script via interacting with the web pages.


SUMMARY
----------------------
By opening the start screen and pressing record, you will be prompted to select a container node. This node and all of it's children will be watched for any dom mutations or user interaction. All user interaction and dom mutations will be reported in the script save modal allowing you to view the steps in more detail.

CURRENT FEATURES
-------------------
* Ugly Modal will allow you to begin the recording process
* The container node can now be selected


FUTURE FEATURES
----------------
06/04/2016 - Script saving - save the script file to your desktop computer

06/12/2016 - Script editing - view the collected interactions in detail in order to edit parameters. Also set configuration options such as wait multiplier, create script nodes to pull/generate dynamic data to conduct testing, and create a list of tests to perform in order to hit all your edge cases.


TBD - PhantomJS Port - export your script as a PhantomJS script
