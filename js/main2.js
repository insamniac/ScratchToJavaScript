imageFlipper = function(originalImage) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var newImage = new Image();
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
    ctx.drawImage(originalImage, 0, 0);
    newImage.src = canvas.toDataURL();
    return newImage;
};


var player = {
    x: 200,
    y: 200,
    size: 100,
    img: {},
    speed: 4,
    dir: {
        x: 0,
        y: 0
    }
};

playerImage = new Image();
playerImage.src = 'images/witch.svg';
playerImage.addEventListener('load', function(e) {
    console.log(e);
    player.img.right = playerImage;
    player.img.left = imageFlipper(playerImage);
    player.costume = player.img.right;
});

bulletImage = new Image();
bulletImage.src = 'images/bullet.svg';
bulletSound = new Audio('audio/bullet.wav');




var render = function(obj, ctx) {
    if (obj.render && typeof(obj.render) === 'function') {
        return obj.render(ctx);
    }
    if (obj.costume && obj.costume.complete && obj.x && obj.y && ((obj.height && obj.width) || obj.size)) {

        if (obj.size) {
            obj.width = obj.size;
            obj.height = obj.size;
        }

        ctx.translate(obj.x + (obj.width / 2), obj.y + (obj.y / 2));
        ctx.drawImage(obj.costume, -obj.width / 2, -obj.height / 2,
            obj.width,
            obj.height);

        ctx.translate(-obj.x - (obj.width / 2), -obj.y - (obj.y / 2));

    } else {
        console.log('Not enough attributes to render Object: ' + obj);
        console.log(obj);
    }
};

var GAMEOVER = false;
var ENEMY_DELAY = 10;
var nextEnemy = 4;
var gameObjects = [];
var keyStates = {};



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
    console.log(player);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function shoot() {

    var bullet = {
        type: 'bullet',
        speed: 6,
        size: 15,
        costume: bulletImage,
        dir: {
            y: 0
        },
        y: player.y
    };

    if (player.costume == player.img.right) {
        bullet.dir.x = 1;
        bullet.x = player.x + player.width;

    } else {
        bullet.dir.x = -1;
        bullet.x = player.x;

    }

    gameObjects.push(bullet);


}

function handleKeyEvent(e) {
    var status = e.type === 'keydown';
    console.log(e.key + ': ' + e.type);
    console.log(e);
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keyStates.u = status;
            break;
        case 'a':
        case 'ArrowLeft':
            keyStates.l = status;
            break;
        case 's':
        case 'ArrowDown':
            keyStates.d = status;
            break;
        case 'd':
        case 'ArrowRight':
            keyStates.r = status;
            break;
        case ' ':
            if (status) {
                shoot();
            }
            break;
    }
}

resizeCanvas();

function drawBackground() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}



function doMovement() {

    player.dir.y = keyStates.u ? -1 : 0;
    player.dir.y = keyStates.d ? 1 : player.dir.y;
    player.dir.x = keyStates.l ? -1 : 0;
    player.dir.x = keyStates.r ? 1 : player.dir.x;

    player.costume = keyStates.l ? player.img.left : (keyStates.r ? player.img.right : player.costume);
    //    player.costume = player.img.right;

    player.x += player.speed * player.dir.x;
    player.y += player.speed * player.dir.y;

    gameObjects.forEach(function(obj) {
        obj.x += obj.speed * obj.dir.x;
        obj.y += obj.speed * obj.dir.y;
    });
}

function checkCollisions() {

}

function doRendering() {
    drawBackground();
    render(player, context);
    gameObjects.forEach(function(x) {
        render(x, context);
    });
}

function destroyAndCreate(timestamp) {

    gameObjects.map(function(obj) {
        if (obj.x < 0 || obj.x > canvas.width || obj.y < 0 || obj.y > canvas.height) {
            obj.destroy = true;
        }
    });

    gameObjects = gameObjects.filter(function(obj) {
        return !obj.destroy
    });
    var tick = Math.floor(timestamp / 1000);
    if (tick === nextEnemy) {
        nextEnemy += ENEMY_DELAY;
        console.log('New Enemy Created at: ' + tick + '.  Next At: ' + nextEnemy);
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