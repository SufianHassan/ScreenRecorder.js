var self = require("sdk/self");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var panel = require("sdk/panel");

var mainModal = panel.Panel({
  contentURL: data.url("partials/container.html"),
  contentScriptFile: [data.url("js/container.js"), data.url("js/recording/recordingFunctions.js"), data.url("js/app.js")]
});

var button = require('sdk/ui/button/action').ActionButton({
  id: "screenrecorderjs-link",
  label: "Open ScreenRecorderJS Control Panel",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  mainModal.show();
}

// leave this here to eventually test stuff...
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
