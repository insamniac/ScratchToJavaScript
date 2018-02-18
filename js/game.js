var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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
        score =  0;
        background= images.background;
        enemyDelay= 4;
        entities= [];
        renders = [];
        player= {
            pos: {
                x: canvas.width / 2,
                y: canvas.height / 2
            },
            size: 100,
            speed: 8,
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
        entities=[];
}



function initialize() {

    initialState();
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('keydown', handleKeyEvent, false);
    window.addEventListener('keyup', handleKeyEvent, false);

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
                    }
                }
            });
        }
    });

    // check if objects are outside game board and destroy
    entities.forEach(function(obj) {
        if (obj.pos.x < 0 || obj.pos.x > canvas.width || obj.pos.y < 0 || obj.pos.y > canvas.height) {
            obj.destroy = true;
        }
    });


    // check if enemy is touching witch and game over.
    entities.forEach(function(obj) {
        if (obj.type == 'enemy') {
            if (areTouching(obj,player)) {
                gameover();
            }
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
}

function gameStep(timestamp) {
    doMovement();
    checkCollisions();
    doRendering();
    destroyAndCreate(timestamp);
    window.requestAnimationFrame(gameStep);
}

function gameover() {
    GAMEOVER=true;
    INPUT_DISABLED=true;
    setTimeout(function() { 
        INPUT_DISABLED=false;
    }, 1000);
    sounds.play('scream');
    var gOver=  { type: 'gameover',
                  pos: { x: canvas.width / 2,
                         y: canvas.height / 2},
                  size: 500,
                  costume: images.gameover};
//    render(gOver, context);
    entities=[gOver];
    
}



initialize();
window.requestAnimationFrame(gameStep);

