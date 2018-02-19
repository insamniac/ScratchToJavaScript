

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var sounds = {
	 context: new AudioContext(),
     play: playSound
};

  loadSound('bullet', "bullet.wav");
  loadSound('bg-default', "background-music.mp3");
  loadSound('car-theft', "car-theft.mp3");
  loadSound('gameover', "gameover.wav");
  loadSound('scream', "ahhh.wav");
  loadSound('ugh', "ugh.wav");
  loadSound('yay', "yay.wav");
  loadSound('level-up', "level-up.mp3");


sounds.gainNode = sounds.context.createGain();
sounds.gainNode.gain.value=0.1;

sounds.mute = function() {
    sounds.gainNode.gain.value=0;
}

sounds.unmute = function() {
    sounds.gainNode.gain.value=0.1;
}

sounds.setVolume = function(v) {
    sounds.gain.node.gain.value=v;
}

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
    return source;
}

BG_SOURCE=null;
function changeBackgroundMusic(name) {
    if (BG_SOURCE) {
        BG_SOURCE.stop();
    }
    BG_SOURCE=playSound(name,true);
}


setTimeout(function() {
    changeBackgroundMusic('bg-default');
},3000);



document.getElementById('volume-control').addEventListener('click', function(e) {
    console.log(e);
    if (e.target.classList.contains('muted')) {
        sounds.unmute();
        e.target.classList.remove("muted");
    } else {
        sounds.mute();
        e.target.classList.add("muted");
    }
    document.activeElement.blur();
});
