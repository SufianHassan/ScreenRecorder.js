
/**
 * The list of actions our output script will perform
 * Format: {
 *	wait: '', // the time to wait before executing this action (multiplied by the user specified speed weight) 
 *  eventType: '', // the type of event that was captured
 *  eventDetails: '', // the event object that was captured
 *  node: '', // the node this event was captured on
 * }
 */
//TODO this will eventually be a WebWorker
var RecordingThread = {
  
  findRootElement: function(event) {
    event.stopPropagation();
    selectRootElement(this.config, this.start);
  },
  
  start: function(){    
    
  },
  stop: function() {},
  pause: function() {},
  script: [],
  config: {
    //this is multiplied by the wait times between actions in order to speed up/slow down play back
    waitMultiplier: 1.0, 
    //this is the container for which we watch all dom mutations and record interactions with
    rootElement: null, 
    //this will ensure strict compliance to watching only for events the tag type typically handles. Button -> clicks, Text input ->keypress, Radio/Slect -> toggle/value change
    qualifyNodes: false, 
    //if true all listeners attached by the pages javascript will automatically qualify that element for that event type. this gives us the flexibility to adapt to pretty strange coding practices
    existingListenerQualifies: false 
  } 
};


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
	//the current event types we know how to handle
	var eventTypes = ['click', 'keypress', 'dblclick', 'drag'];

	var observerConfig = { attributes: true, childList: true, characterData: true };
	var Observer = new MutationObserver(function(list) {
		list.forEach(function(mutation) {
			listenOnNodes(mutation.addedNodes);
		})
	});
  
	//TODO we have to ensure our existing nodes we listen to are children of or are the rootNodes
	var pageElements = findExistingElements(rootElement, configOptions);
	listenOnElements(pageElements);
	Observer.observe(rootNode, observerConfig);		
}