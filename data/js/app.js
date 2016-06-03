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

function selectRootElement() {
  var existingNodes = document.getElementsByTagName('*');

  var removeListeners = function() {
    for(var index = 0; index < existingNodes.length; index++) {
      var node = existingNodes[index];
      node.removeEventListener('click', actualListener);
    }
  };


  var buildActualListener = function(configOptions, startFunction) {

    return function(event) {
      event.stopPropagation();
      configOptions.rootElement = event.target;
      if(this.config.rootElement == void 0 || !this.config.rootElement) {
        //TODO throw error, alert, or something...
        alert("<b>Sorry! It seems like the root Element has not been selected correctly :(</b>");
        return;
      }
      removeListeners();
      startFunction();
    };
  }

  for(var index = 0; index < existingNodes.length; index++) {
    var node = existingNodes[index];
	node.addEventListener('click', actualListener);
  }
}

document.getElementById('newRecordingBtn').addEventListener('click', RecordingThread.findRootElement);

//TODO open prompt to have user select file from desktop
function openLoadRecordingScreen() {
  console.log("here");
}

// $('.loadRecording').submit(function(){
//   $.preventDefault();``
//   console.log("here");
// })

document.getElementById('loadRecordingBtn').addEventListener('click', openLoadRecordingScreen);

//TODO open modal displaying the script's steps displayed in a table allowing the user to edit the steps
function openEditRecordingScreen(event) {
  console.log("Hello!");
}

document.getElementById('editRecordingBtn').addEventListener('click', openEditRecordingScreen);
/**





//the root element the script is focusing on, default it to body? or make a pop up requesting user to select
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
 * /
var scriptActions = [];

var observerConfig = { attributes: true, childList: true, characterData: true };

var Observer = new MutationObserver(function(list) {
	list.forEach(function(mutation) {
		listenOnNodes(mutation.addedNodes);
	})
});

function startListening(){
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
}

startListening();

*/
