

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var sounds = {
	 context: new AudioContext(),
     play: playSound
};

  loadSound('bullet', "bullet.wav");
//TODO: fix this sound file.... or get different background music!
  loadSound('bg', "background-music.mp3");
  loadSound('gameover', "gameover.wav");
  loadSound('scream', "scream.wav");


sounds.gainNode = sounds.context.createGain();
sounds.gainNode.gain.value=0.1;


function loadSound(soundName, fileName) {
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


function playSound(name, repeat) {
    repeat = repeat || false;
	var source = sounds.context.createBufferSource();
	source.buffer = sounds[name];
    if (repeat) {
        source.loop = true;
    }
	source.connect(sounds.gainNode);
	sounds.gainNode.connect(sounds.context.destination);
	source.start(0);
}


setTimeout(function() {
    playSound('bg', true);
},2000);
