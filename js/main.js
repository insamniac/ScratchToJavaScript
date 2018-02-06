(function() {


    playerImage = new Image();
    playerImage.src = "images/witch.svg";

    var player = { x:200, y: 200, size: 100, img: playerImage, speed: 4};



    var render  = function(obj, ctx) {
        if (obj.render && typeof(obj.render) === "function") {
            return obj.render(ctx);
        }
        if (obj.img && obj.x &&  obj.y &&  ((obj.height && obj.width) || obj.size)) {
            if (obj.size) {
                obj.width = obj.size;
                obj.height = obj.size;
            }
            ctx.drawImage(obj.img, 
                          obj.x - (obj.width / 2), 
                          obj.y - (obj.height /2), 
                          obj.width, 
                          obj.height);
        } else {
            console.log("Not enough attributes to render Object: "+obj);
        }
    }; 

    var GAMEOVER = false;
    var ENEMY_DELAY = 10 ;
    var nextEnemy = 4;
    var gameObjects = [];
    var keyStates={};

    

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
	
    var backgroundImage = new Image();
    backgroundImage.src = 'images/background.png';
    
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('keydown', handleKeyEvent, false);
    window.addEventListener('keyup', handleKeyEvent, false);

    function init() {
        player.y = canvas.height / 2;
        player.x = canvas.width / 2;
    }

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}


function handleKeyEvent(e) {
    var status = e.type === "keydown";
    console.log(e.key +": "+e.type);
    switch(e.key) {
        case "w":
        case "ArrowUp":
            keyStates.u = status;
            break;
        case "a":
        case "ArrowLeft":
            keyStates.l = status;
            break;
        case "s":
        case "ArrowDown":
            keyStates.d = status;
            break;
        case "d":
        case "ArrowRight":
            keyStates.r = status;
            break;
    }
}

resizeCanvas();

function drawBackground() {
    context.drawImage(backgroundImage, 0 , 0 , canvas.width, canvas.height);
}



function doMovement() {
     keyStates.u && (player.y -= player.speed);
     keyStates.d && (player.y += player.speed);
     keyStates.l && (player.x -= player.speed);
     keyStates.r && (player.x += player.speed);
    
};

function checkCollisions() {

}

function doRendering() {
    drawBackground();
    render(player, context);
    gameObjects.forEach(function(x) {
        render(x,context);
    })
}

function destroyAndCreate(timestamp) {

    gameObjects = gameObjects.filter(function(x) { return !x.destroy});
    var tick=Math.floor(timestamp/1000);
        if (tick === nextEnemy) {
        nextEnemy+=ENEMY_DELAY;
        console.log("New Enemy Created at: "+tick+ ".  Next At: "+nextEnemy);
    }
}


function gameStep(timestamp) {
    doMovement();
    checkCollisions();
    destroyAndCreate(timestamp);
    doRendering();
    if (!GAMEOVER) {
        window.requestAnimationFrame(gameStep);
    } else {
        gameover();
    }
}



init();
window.requestAnimationFrame(gameStep);


})();


