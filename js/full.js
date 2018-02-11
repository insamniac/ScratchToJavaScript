function shootTiny() {
    var b = makeBullet();
    // we can change the origina bullet's properties
    b.size = 5;

    gameObjects.push(b);
}



bulletImage = new Image();
bulletImage.src = 'images/bullet.svg';
//  bulletSound = new Audio('audio/bullet.wav');

purpleBulletImage = new Image();
purpleBulletImage.src = 'images/purplestickyball.png';

iceImage = new Image();
iceImage.src = 'images/fireworkfreezingiceball.png';

enemyImage = new Image();
enemyImage.src = 'images/dragon.png';

function makeBullet() {

    var bullet = {
        type: 'bullet',
        speed: 20,
        size: 15,
        costume: bulletImage,
        crazy: true,
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
    return bullet;


}

function shoot() {
    gameObjects.push(makeBullet());
}

function shootBig() {
    var b = makeBullet();
    b.size = 60;
    b.costume = purpleBulletImage;
    b.dir.y = 0.5 - Math.random();
    b.crazy = true;
    gameObjects.push(b);
}

function shootTiny() {
    var b = makeBullet();
    // we can change the origina bullet's properties
    b.size = 5;
    b.speed = 30;
    b.dir.y = 0.5 - Math.random();
    b.crazy = true;
    gameObjects.push(b);
}

function shootIcy() {
    var b = makeBullet();
    // we can change the origina bullet's properties
    b.size = 80;
    7;
    b.costume = iceImage;
    b.dir.y = 0.5 - Math.random();
    b.crazy = true;
    gameObjects.push(b);
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
        case 'f':
            if (status) {
                shootBig();
            }
            break;
        case 't':
            if (status) {
                shootTiny();
            }
            break;
        case 'g':
            if (status) {
                shootIcy();
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
        if (obj.crazy) {
            obj.dir.y -= 0.5 - Math.random();
            obj.size -= (0.5 - Math.random()) * 5;
        }
        if (obj.type === 'enemy') {
            if (obj.x > player.x) {
                obj.dir.x = -1;
            } else {
                obj.dir.x = 1;
            }
            if (obj.y > player.y) {
                obj.dir.y = -1;
            } else {
                obj.dir.y = 1;
            }
        }
    });
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
        var m = makeEnemy();
        gameObjects.push(m);
        console.log('New Enemy Created at: ' + tick + '.  Next At: ' + nextEnemy);
    }
}

function makeEnemy() {

    var enemy = {
        type: 'enemy',
        speed: 4,
        size: 300,
        costume: enemyImage,
        dir: {
            y: 0,
            x: 0
        },
        y: canvas.height * Math.random(),
        x: canvas.width * Math.random()
    };

    return enemy;


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