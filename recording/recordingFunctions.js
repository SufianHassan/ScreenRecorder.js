function registerOnNode(eventName, node) {	
	return function(event) {
		if(event.target != this || recordingLocked) {
			return;
		}
		userActions[userActions.length] = {node: node, eventName: eventName, eventDetails: event};
		console.log(userActions);
	};
}

function registerAllEvents(node) {
	for(var index = 0; index < eventTypes.length; index++) {
		var event = eventTypes[index];
		node.addEventListener(event, registerOnNode(event, node));
	}
}

function listenOnNodes(nodeList) {
	for(var index = 0; index < nodeList.length; index++) {
		var node = nodeList[index];
		registerAllEvents(node);		
	}
}
//checks to see if the node qualifies for a given event, if not weird behaviour may occur
//TODO - enable user to toggle the qualifer on/off
function nodeQualifies(eventName, node) {
	if(eventName == 'keypress') {
		return (node.type == 'text') ? true : false;
	}
}