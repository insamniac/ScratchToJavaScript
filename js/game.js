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
        BULLET_SIZE=10;
        BULLET_SPEED=15;
        ENEMY_DELAY= 5;
        POWERUP_DELAY= 1;
        LIFE_DELAY= 20;
        nextLife= 5;
        nextEnemy= 4;
        nextPowerup= 2;
        background= images.background;
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
            score: 0,
            level: 1,
            bullets: 20,
            dir: {
                x: 0,
                y: 0
            }
        };


    addCostume(player, images.witch, true);
}


function resetState() {

        GAMEOVER= false;
        BULLET_SIZE=10;
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
        if (obj1.type == 'enemy' || obj1.type == 'powerup') {
            entities.forEach(function(obj2) {
                if (obj2.type == 'bullet') {
                    if (areTouching(obj1, obj2) && !obj1.destroy && !obj2.destroy) {
                        obj1.destroy = true;
                        obj2.destroy = true;
                        explode(obj2);
                        if (obj1.type == 'enemy') {
                            sounds.play(obj1.sound);
                            player.score = player.score + 1 ;
                        }
                    }
                }
            });
        }
    });

    // check if objects are outside game board and bounce
    entities.forEach(function(obj) {
        if (obj.pos.x < 0 || obj.pos.x > canvas.width || obj.pos.y < 0 || obj.pos.y > canvas.height) {
            bounce(obj);
        }
    });

    // don't let witch go outside game board.
    if (player.pos.x < 0 + player.size/ 2) {
        player.pos.x=player.size/2;
    }
    if (player.pos.x > canvas.width- player.size/ 2) {
        player.pos.x=canvas.width - player.size/ 2;
    }
    if (player.pos.y < 0 + player.size/ 2) {
        player.pos.y = player.size/2;
    }
    if ( player.pos.y > canvas.height - player.size/ 2) {
        player.pos.y=canvas.height - player.size / 2;
    }

    // check if enemy is touching witch and game over.
    entities.forEach(function(obj) {
        if (obj.type == 'enemy' && areTouching(obj,player)) {
            obj.destroy = true;
            loseALife();
        } else if (obj.type == 'powerup' && areTouching(obj, player))  {
            sounds.play('yay');
            BULLET_SIZE+=1
            player.bullets+=1;
            player.size+=1;
            player.speed+=0.2;
            explode(obj, images.blueBullet, 15);
            obj.destroy = true;
        }   else if (obj.type == 'life' && areTouching(obj, player))  {
            sounds.play('yay');
            player.lives += 1;
            explode(obj);
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
        nextEnemy = tick+ ENEMY_DELAY;
        var m = makeEnemy();
        entities.push(m);
        console.log('New Enemy Created at: ' + tick + '.  Next At: ' + nextEnemy);
    }
    if (tick >= nextPowerup) {
        nextPowerup = tick+ POWERUP_DELAY;
        var p = makePowerup();
        entities.push(p);
        console.log('New powerup Created at: ' + tick + '.  Next At: ' + nextPowerup);
    }
    if (tick >= nextLife) {
        nextLife = tick+ LIFE_DELAY;
        var p = makeLife();
        entities.push(p);
        console.log('New Life Created at: ' + tick + '.  Next At: ' + nextLife);
    }
}
function checkLevelUp() {
  if (player.score == 15 && player.level == 1) {
    player.level = 2;
    ENEMY_DELAY -= 1;
      changeBackgroundMusic('car-theft');
  }
  if (player.score == 40 && player.level == 2) {
    player.level = 3;
    player.size += 50;
    BULLET_SPEED += 20;
    ENEMY_DELAY -= 1;
  }
  if (player.score == 60 && player.level == 3) {
    player.level = 4;
    BULLET_SPEED += 50;
    player.bullets += 20;
    ENEMY_DELAY -= 1;
  }
  if (player.score == 100 && player.level == 4) {
    player.level = 5;
    BULLET_SPEED += 60;
    player.bullets += 30;
    ENEMY_DELAY -= 1;
  }

}

function gameStep(timestamp) {
    if (!PAUSED && !GAMEOVER) {
        doMovement();
        checkCollisions();
        destroyAndCreate(timestamp);
        checkLevelUp();
    }
    doRendering();
    window.requestAnimationFrame(gameStep);
}


function loseALife() {
  sounds.play("scream");
  player.lives = player.lives - 1 ;
  explode(player);
   player.dir = {
      x: 0,
      y: 0
   }
  if (player.lives > 0) {
    PAUSED=true;
    setTimeout(function() {
        PAUSED=false;
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
