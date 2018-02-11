// all of our images and some drawing functions

var images = {
    witch: loadImage("witch.png"),
    bullet: loadImage("bullet.svg"),
    purpleBullet: loadImage("purplestickyball.png"),
    blueBullet: loadImage("fireworkfreezingiceball.png"),
    dragon: loadImage("dragon.png"),
    blackBat: loadImage("black-bat-1.svg"),
    brownBat: loadImage("brown-bat-1.svg"),
    background: loadImage("background.png")
};


function drawBackground() {
    context.drawImage(images.background, 0, 0, canvas.width, canvas.height);
}


var motionEffects = {

    crazy: function(obj) {
        obj.dir.y -= 0.5 - Math.random();
        obj.size -= (0.5 - Math.random()) * 5;
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
    if (!obj.costume || !obj.costume.complete) {
        return;
    }
    if (obj.render && typeof(obj.render) === 'function') {
        return obj.render(ctx);
    }
    var x = obj.pos.x;
    var y = obj.pos.y;
    var size = obj.size;
    var radius = size / 2;
    ctx.translate(x + radius, y + radius);
    ctx.drawImage(obj.costume, -radius, -radius, size, size);
    ctx.translate(-x - radius, -y - radius);
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
