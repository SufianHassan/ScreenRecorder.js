//this is just a test function. It simulates repeating a script, in a very hackish manner
function repeatAction(action) {
	var $node = $(action.node);
	if(action.eventName == 'click') {
		//how to simulate w/o security issues?
		$node.click();
	} else if(action.eventName == 'keypress' && nodeQualifies(action.eventName, action.node)) {
		var addedChar = action.eventDetails.key;
		$node.val($node.val() + addedChar);
	}
}
/**
 * sequence - array of recorded actions (structure specified in ../recording/recordingFunctions.js))
 * playbackConfig - {
 * 	 timeWeight: 0.0 //the % of recorded wait time we want to wait in our playback
 *	 mustQualify: true //if true 
 * }
 *
 * return true if successfully finished
 */
function beginPlayback(sequence, playbackConfig) {
	if(sequence.length == 0) {
		return true;
	}

	performAction(sequence, 0, playbackConfig);
}

function performAction(sequence, index, playbackConfig) {
	var timeWeight = (playbackConfig !== void 0 ? playbackConfig : 1);
	var action = sequence[index];
	var waitTime = action.wait * timeWeight;
	
	setTimeout(function(){
		executeAction(sequence[index++]);
		performAction(sequence, index, playbackConfig);
	}, waitTime);
}

// TODO wrap this in a timeout idling for the action.wait?
function executeAction(action) {
	var $node = $(action.node);
	idle(action.wait);
	switch(action.eventName) {
		case 'click': 			
			break;
		case 'keypress':
			break;
		case 'dblclick':
			break;
		case 'drag':
			break;
	}
}