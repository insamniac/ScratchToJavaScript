

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var sounds = {
	 context: new AudioContext(),
	 bullet: loadSound("bullet.wav"),
     play: playSound
}

sounds.gainNode = sounds.context.createGain();
sounds.gainNode.gain.value=0.1;

function loadSound(fileName, soundName) {
	soundName == soundName || fileName;
	var request = new XMLHttpRequest();
	  request.open('GET', "audio/"+fileName, true);
	  request.responseType = 'arraybuffer';

	  // Decode asynchronously
	  request.onload = function() {
		sounds.context.decodeAudioData(request.response, function(buffer) {
		  sounds[soundName] = buffer;
		});
	  }
	  request.send();
}


function playSound(name) {
	var source = sounds.context.createBufferSource();
	source.buffer = sounds[name];
	source.connect(sounds.gainNode);
	sounds.gainNode.connect(sounds.context.destination);
	source.start(0);
}


