// all of our images and some drawing functions

/*
var images = {
    witch: loadImage("witch.png"),
    bullet: loadImage("bullet.svg"),
    purpleBullet: loadImage("purplestickyball.png"),
    blueBullet: loadImage("fireworkfreezingiceball.png"),
    fireBullet: loadImage("fireball.svg"),
    dragon: loadImage("dragon.png"),
    blackBat: loadImage("black-bat-1.svg"),
    brownBat: loadImage("brown-bat-1.svg"),
    background: loadImage("background.png"),
    powerup: loadImage("Powerup.svg"),
    life: loadImage("Life.svg"),
    ghost: loadImage("Ghost.svg"),
    ghoul: loadImage("Ghoul.svg"),
    gameover: loadImage("gameover.png")

};
*/

var images = {
    background: loadImage("background.png"),
    witch: loadImage("witch.png"),
    bullet: loadImage("bullet.svg"),
    purpleBullet: loadImage("purplestickyball.png"),
    blueBullet: loadImage("fireworkfreezingiceball.png"),
    fireBullet: loadImage("fireball.svg"),
    dragon: loadImages(["dragon.png", "dragon2.svg"]),
    blackBat: loadImages(["black-bat-1.svg","black-bat-2.svg"]),
    brownBat: loadImages(["brown-bat-1.svg", "brown-bat-2.svg"]),
    powerup: loadImage("Powerup.svg"),
    life: loadImages(["Life.svg","Life2.svg"]),
    ghost: loadImages(["Ghost.svg","Ghost2.svg"]),
    ghoul: loadImages(["Ghoul.svg","Ghoul2.svg"]),
    redDragon: loadImage("red-dragon.png"),
    gameover: loadImage("gameover.png")

};


BG_TINT='black'
function drawBackground() {
    context.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    context.fillStyle=BG_TINT;
    context.globalAlpha=0.3;
    context.fillRect(0,0,canvas.width,canvas.height);
    context.globalAlpha=1;
}

function drawScoreLevelAndLives() {
    context.font="20px Arial";
       context.fillStyle = '#f50';
    context.fillRect(1,1, 600, 30);
       context.fillStyle = '#000';
    context.fillText('Score: '+player.score, 90, 20);
    context.fillText('Level: '+player.level, 200, 20);
    context.fillText('Lives: '+player.lives, 310, 20);
       context.fillStyle = '#00D';
    context.fillText('Bullets: '+player.bullets, 420, 20);
}

var motionEffects = {

    crazy: function(obj) {
        obj.dir.y = randomBetween(0, obj.dir.y * 2) ;
        obj.dir.x = randomBetween(obj.dir.x, obj.dir.x * 2) ;
       obj.size  += randomBetween(-10,10);
        if (obj.size < 40) {
            obj.size = 40;
        }
    },
    goToEnemy: function(obj) {

        var closestEnemy = findClosestOfType(obj, "enemy");
        if (closestEnemy) {
            pointToward(obj, closestEnemy);
        }
    }

}

// this will draw an object on a canvas context. the object must have at least
// these properties:  [costume, pos.x, pos.y, size]

function render(obj, ctx) {
    var costume = obj.costume;
    if (Array.isArray(costume)) {
        costume=costume[ANIMATION_FRAME];
    }
    if (!costume || !costume.complete) {
        return;
    }
    if (obj.render && typeof(obj.render) === 'function') {
        return obj.render(ctx);
    }
    var x = obj.pos.x;
    var y = obj.pos.y;
    var w = obj.width || obj.size;
    var h = obj.height || obj.size;
        ctx.save()
    ctx.translate(x + w/2, y + h/2);
    if (obj.facing && obj.facing == 'left') {
        ctx.scale(-1,1);
        ctx.drawImage(costume, 0, -h, w, h);
    } else {
        ctx.drawImage(costume, -w, -h, w, h);
    }
    ctx.translate(-x - w/2, -y - h/2);
        ctx.restore()
}

// this takes an image and flips it along the y-axis and returns it as a new image.

function flipImage(originalImage) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var newImage = new Image();
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
    ctx.drawImage(originalImage, 0, 0);
    newImage.src = canvas.toDataURL();
    ctx = null;
    canvas = null;
    return newImage;
}


function loadImage(file) {
    var image = new Image();
    image.src = "images/" + file;
    return image;

}

// creating a function of loadImages, it's argument being the fileList- it defines imageList- which is empty, but then, for
// each item in fileList we call loadImage and add the result to the imageList! Then it defines img as loadImage and it's
// argumenmt is file- and then it pushes the image the the imageList.
function loadImages(fileList){
  var imageList = [];
    fileList.forEach(function(file){
        var img = loadImage(file);
          imageList.push(img);
    });
      return imageList;
}


function addCostume(target, image, flip) {

    if (flip) {
        if (image.complete) {
            target.img = {
                right: image,
                left: flipImage(image)
            };
            target.costume = target.img.right;
        } else {
            image.addEventListener('load', function(e) {
                console.log(e);
                target.img = {
                    right: image,
                    left: flipImage(image)
                };
                target.costume = target.img.right;
            });

        }
    } else {
        target.costume = image;
    }
}


function explode(obj) {
    var speed =  randomBetween(10,20);
    var count = 50;
    var maxChunk = obj.size / count + 3;
    var fireballs=[];
    for (var i=0; i<count ; i++) {
        var ball = {
                     costume: obj.costume,
                     size: randomBetween(1,maxChunk),
                     speed: speed,
                     pos: {y: obj.pos.y, x: obj.pos.x},
                     dir: { y: (obj.dir.y * obj.speed)  / speed  +  ( Math.random() * -1 + Math.random()),
                            x: ( obj.dir.x  * obj.speed) / speed +  (Math.random() * -1 + Math.random()) }

        };
        fireballs.push(ball);
        entities.push(ball);
    };
    setTimeout(function(){
        fireballs.forEach(function(f) {f.destroy=true});
    }, 1000 );

}
