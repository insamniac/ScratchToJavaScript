(function() {


    var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');
	var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';


    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    }
    resizeCanvas();


var  refreshRate = 1000 / 60;

function step(timestamp) {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);


})();


