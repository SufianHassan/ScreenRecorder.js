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

function listenOnElements(nodeList) {
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

function findExistingElements(rootElement, configOptions) {
  var elements = rootElement.childrenNodes;
  elements = [rootElement].concat(nodes);
  
  for(var index = 0; index < elements.length; index++) {
    if() {
      
    }
      
  }
}

function startListening(rootElement, configOptions){
	//TODO we have to ensure our existing nodes we listen to are children of or are the rootNodes
	var pageElements = findExistingElements(rootElement, configOptions);
	listenOnElements(pageElements);
	Observer.observe(rootNode, observerConfig);		
}