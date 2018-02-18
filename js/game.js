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



    var state = {
        canvas: canvas,
        context: context,
        gameOver: false,
        paused: false,
        nextEnemy: 4,
        INPUT_DISABLED: false, 
        score: 0,
        background: images.background,
        settings: {
            enemyDelay: 4,
            bulletSpeed: 6
        },
        entities: [],
        renders: [],
        player: {
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
        }
    };




    addCostume(state.player, images.witch, true);
    return state;
}


function resetState() {

        state.gameOver = false;
        state.nextEnemy = 4;
        state.player.pos.x = canvas.width / 2;
        state.player.pos.y = canvas.height / 2;
        state.player.dir = {x:0, y:0};
        state.entities=[];
    return state;
}



function initialize() {

    state = initialState();
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('keydown', handleKeyEvent, false);
    window.addEventListener('keyup', handleKeyEvent, false);
    return state;

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
    var player = state.player;
    var entities = state.entities;

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
    state.entities.forEach(function(obj1) {
        if (obj1.type == 'enemy') {
            state.entities.forEach(function(obj2) {
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
    state.entities.forEach(function(obj) {
        if (obj.pos.x < 0 || obj.pos.x > canvas.width || obj.pos.y < 0 || obj.pos.y > canvas.height) {
            obj.destroy = true;
        }
    });


    // check if enemy is touching witch and game over.
    state.entities.forEach(function(obj) {
        if (obj.type == 'enemy') {
            if (areTouching(obj,state.player)) {
                gameover();
            }
        }
    });


}

function doRendering() {
    drawBackground();
    render(state.player, context);
    state.entities.forEach(function(x) {
        render(x, context);
    });
    while (state.renders.length > 0 ) {
        var r = state.renders.shift();
        r();
    }
}

function destroyAndCreate(timestamp) {


    state.entities = state.entities.filter(function(obj) {
        return !obj.destroy
    });
    
    var tick = Math.floor(timestamp / 1000);
    if (tick >= state.nextEnemy) {
        state.nextEnemy = tick+ state.settings.enemyDelay;
        var m = makeEnemy();
        if (!state.gameOver) {
            state.entities.push(m);
            console.log('New Enemy Created at: ' + tick + '.  Next At: ' + state.nextEnemy);
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
    state.gameOver=true;
    state.INPUT_DISABLED=true;
    setTimeout(function() { 
        state.INPUT_DISABLED=false;
    }, 1000);
    sounds.play('scream');
    var gOver=  { type: 'gameover',
                  pos: { x: canvas.width / 2,
                         y: canvas.height / 2},
                  size: 500,
                  costume: images.gameover};
//    render(gOver, context);
    state.entities=[gOver];
    
}



var state = initialize();
window.requestAnimationFrame(gameStep);

