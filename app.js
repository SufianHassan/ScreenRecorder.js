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

(function registerExistingNodes(){
	var existingNodes = document.getElementsByTagName("*");
	listenOnNodes(existingNodes);
}());

var observerConfig = { attributes: true, childList: true, characterData: true };

var Observer = new MutationObserver(function(list) {
	list.forEach(function(mutation) {
		listenOnNodes(mutation.addedNodes);
	})
});
var rootNode = document.getElementById(ROOT_ELEMENT);
Observer.observe(rootNode, observerConfig);

