var self = require("sdk/self");

//the root element the script is focusing on, default it to body? or make a pop up requesting user to select
var ROOT_ELEMENT = {type: 'tagName', value: 'body'};
var recordingLocked = false;
//the current event types we know how to handle
var eventTypes = ['click', 'keypress', 'dblclick', 'drag'];
/**
 * The list of actions our output script will perform
 * Format: {
 *	wait: '', // the time to wait before executing this action (multiplied by the user specified speed weight) 
 *  eventType: '', // the type of event that was captured
 *  eventDetails: '', // the event object that was captured
 *  node: '', // the node this event was captured on
 * }
 */
var scriptActions = [];

var observerConfig = { attributes: true, childList: true, characterData: true };

var Observer = new MutationObserver(function(list) {
	list.forEach(function(mutation) {
		listenOnNodes(mutation.addedNodes);
	})
});

(function startListening()){
	var rootNode = '';
	//TODO we have to ensure our existing nodes we listen to are children of or are the rootNodes
	var existingNodes = document.getElementsByTagName('*');
	listenOnNodes(existingNodes);
	
	if(ROOT_ELEMENT.type == 'tagName') {
		rootNode = document.getElementsByTagName(ROOT_ELEMENT.value);		
		if(rootNode.length > 1) {
			//TODO THROW ERROR - ROOT_ELEMENT NOT UNIQUE
		} else {
			rootNode = rootNode[0];
		}
	} else if(ROOT_ELEMENT.type == 'id') {
		rootNode = document.getElementById(ROOT_ELEMENT.value);
	} else if(ROOT_ELEMENT.type == 'name') {
		rootNode = document.getElementsByName(ROOT_ELEMENT.value);
		if(rootNode.length > 1) {
			//TODO THROW ERROR - ROOT_ELEMENT NOT UNIQUE
		} else {
			rootNode = rootNode[0];
		}
	}
	if(rootNode instanceof Array) {
		for(var index = 0; index < rootNode.length; index++) {
			var aRootNode = rootNode[index];
			Observer.observe(aRootNode, observerConfig);	
		}
	} else {
		Observer.observe(rootNode, observerConfig);	
	}	
}());






// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
