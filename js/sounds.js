

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var sounds = {
	 context: new AudioContext(),
     play: playSound
};

  loadSound('bullet', 'bullet.wav');
  loadSound('bg-default', 'background-music.mp3');
  loadSound('car-theft', 'car-theft.mp3');
  loadSound('desert-mayhem', 'desert-mayhem.mp3');
  loadSound('street-chaos', 'street-chaos.mp3');
  loadSound('fantasy-forest-battle', 'fantasy-forest-battle.mp3');
  loadSound('gameover', 'gameover.wav');
  loadSound('scream', 'ahhh.wav');
  loadSound('ugh', 'ugh.wav');
  loadSound('yay', 'yay.wav');
  loadSound('level-up', 'level-up.mp3');

sounds.bgList = ['bg-default', 'car-theft', 'desert-mayhem', 'street-chaos', 'fantasy-forest-battle'];
sounds.gainNode = sounds.context.createGain();
sounds.gainNode.gain.value = 0.1;

sounds.mute = function() {
    sounds.gainNode.gain.value = 0;
};

sounds.unmute = function() {
    sounds.gainNode.gain.value = 0.1;
};

sounds.setVolume = function(v) {
    sounds.gain.node.gain.value = v;
};

function loadSound(soundName, fileName) {
	soundName == soundName || fileName;
	var request = new XMLHttpRequest();
	  request.open('GET', 'audio/'+ fileName, true);
	  request.responseType = 'arraybuffer';

	  // Decode asynchronously
	  request.onload = function() {
		sounds.context.decodeAudioData(request.response, function(buffer) {
		  sounds[soundName] = buffer;
		});
	  };
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

BG_SOURCE = null;
BG_INDEX = 0;
function cycleBackgroundMusic() {
    if (BG_INDEX == sounds.bgList.length - 1) {
        BG_INDEX = 0;
    } else {
        BG_INDEX += 1;
    }
    if (BG_SOURCE) {
        BG_SOURCE.stop();
    }
    setTimeout(function() {
        BG_SOURCE = playSound(sounds.bgList[BG_INDEX], true);
    },1500);
}


setTimeout(function() {
    BG_SOURCE = playSound('bg-default', true);
},3000);


VOLUME_CONTROL=document.getElementById('volume-control');
VOLUME_CONTROL.addEventListener('click', function(e) {
    console.log(e);
    if (e.target.classList.contains('muted')) {
        sounds.unmute();
        e.target.classList.remove('muted');
    } else {
        sounds.mute();
        e.target.classList.add('muted');
    }
    document.activeElement.blur();
});
