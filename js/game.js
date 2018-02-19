var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
   context.textBaseline = 'top';


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}



function initialState() {


    resizeCanvas();
    var backgroundImage = new Image();
    backgroundImage.src = 'images/background.png';



        GAMEOVER = false;
        PAUSED = false;
        nextEnemy= 4;
        nextPowerup= 2;
        score =  0;
        background= images.background;
        enemyDelay= 4;
        powerupDelay= 5;
        entities= [];
        renders = [];
        player= {
            pos: {
                x: canvas.width / 2,
                y: canvas.height / 2
            },
            size: 100,
            speed: 10,
            lives: 3,
            dir: {
                x: 0,
                y: 0
            }
        };


    addCostume(player, images.witch, true);
}


function resetState() {

        GAMEOVER= false;
        nextEnemy = 4;
        player.pos.x = canvas.width / 2;
        player.pos.y = canvas.height / 2;
        player.dir = {x:0, y:0};
        player.size = 100;
        entities=[];
}



function initialize() {

    initialState();
    window.addEventListener('resize', resizeCanvas, false);

}

function pointToward(obj1, obj2, precision) {
    precision = precision || 1;
    if (obj1.pos.x > obj2.pos.x) {
        obj1.dir.x = -1;
    } else {
        obj1.dir.x = 1;
    }
    if (obj1.pos.y > obj2.pos.y) {
        obj1.dir.y = -1;
    } else {
        obj1.dir.y = 1;
    }
}

function move(obj) {
    if (!obj.dir) {
        return;
    }
    if (obj.effects) {
        obj.effects.forEach(function(e) {
            e(obj);
        });
    }
    obj.pos.x += obj.speed * obj.dir.x;
    obj.pos.y += obj.speed * obj.dir.y;
}

function doMovement() {
    if (player.dir.x > 0) {
        player.costume = player.img.right;
    } else if (player.dir.x < 0) {
        player.costume = player.img.left;
    }

    move(player);
    entities.forEach(function(obj) {
        if (obj.type == 'enemy') {
            pointToward(obj, player);
        }
        move(obj);
    });
}

function checkCollisions() {


    // check enemy/bullet collisions
    entities.forEach(function(obj1) {
        if (obj1.type == 'enemy') {
            entities.forEach(function(obj2) {
                if (obj2.type == 'bullet') {
                    if (areTouching(obj1, obj2) && !obj1.destroy && !obj2.destroy) {
                        obj1.destroy = true;
                        obj2.destroy = true;
                        explode(obj2);
                        sounds.play(obj1.sound);
                    }
                }
            });
        }
    });

    // check if objects are outside game board and destroy
    entities.forEach(function(obj) {
        if (obj.pos.x < 0 || obj.pos.x > canvas.width || obj.pos.y < 0 || obj.pos.y > canvas.height) {
//            obj.destroy = true;
            bounce(obj);
        }
    });


    // check if enemy is touching witch and game over.
    entities.forEach(function(obj) {
        if (obj.type == 'enemy' && areTouching(obj,player)) {
            obj.destroy = true;
            loseALife();
        } else if (obj.type == 'powerup' && areTouching(obj, player))  {
            sounds.play('yay');
            player.size+=5;
            player.speed+=1;
            explode(obj, images.blueBullet, 15);
            obj.destroy = true;
        }
    });


}

function doRendering() {
    drawBackground();
    render(player, context);
    entities.forEach(function(x) {
        render(x, context);
    });
    while (renders.length > 0 ) {
        var r = renders.shift();
        r();
    }

	drawScoreLevelAndLives();

}



function destroyAndCreate(timestamp) {


    entities = entities.filter(function(obj) {
        return !obj.destroy
    });

    var tick = Math.floor(timestamp / 1000);
    if (tick >= nextEnemy) {
        nextEnemy = tick+ enemyDelay;
        var m = makeEnemy();
        if (!GAMEOVER) {
            entities.push(m);
            console.log('New Enemy Created at: ' + tick + '.  Next At: ' + nextEnemy);
        }
    }
    if (tick >= nextPowerup) {
        nextPowerup = tick+ powerupDelay;
        var p = makePowerup();
        if (!GAMEOVER) {
            entities.push(p);
            console.log('New powerup Created at: ' + tick + '.  Next At: ' + nextPowerup);
        }
    }
}


function gameStep(timestamp) {
    doMovement();
    checkCollisions();
    doRendering();
    destroyAndCreate(timestamp);
    window.requestAnimationFrame(gameStep);
}

function loseALife() {
  player.size = 0
  sounds.play("scream");
  player.lives = player.lives - 1 ;
  if (player.lives > 0) {
    PAUSED=true;
    setTimeout(function() {
        PAUSED=false;
        player.size = 100
    }, 2000);

  } else {
      gameover();

  }
}

function gameover() {
    GAMEOVER=true;
    PAUSED=true;
    setTimeout(function() {
        PAUSED=false;
    }, 1000);
    sounds.play('scream');
    var gOver=  { type: 'gameover',
                  pos: { x: canvas.width / 2,
                         y: canvas.height / 2},
                  height: 500,
                  width: 800,
                  costume: images.gameover};
//    render(gOver, context);
    entities=[gOver];

}



initialize();
window.requestAnimationFrame(gameStep);
