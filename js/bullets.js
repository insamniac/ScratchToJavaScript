function makeBullet() {

    var bullet = {
        type: 'bullet',
        speed: 20,
        size: 15,
        costume: images.bullet,

        dir: {
            y: 0
        },

        pos: {
            y: state.player.pos.y + state.player.size / 2
        }
    };

    return bullet;


}


function makeCustomBullet(props) {
    var b = makeBullet()
    for (p in props) {
        b[p] = props[p];
    }
    return b;
}







function shoot(bullet) {
    var player = state.player;
    if (player.costume == player.img.right) {
        bullet.dir.x = 1;
        bullet.pos.x = player.pos.x + player.size;

    } else {
        bullet.dir.x = -1;
        bullet.pos.x = player.pos.x;

    }

    state.entities.push(bullet);
}

var bulletEffects = {

    crazy: function(obj) {
        obj.dir.y -= 0.5 - Math.random();
        obj.size -= (0.5 - Math.random()) * 5;

    }
}

function shootNormal() {
    shoot(makeBullet());
}

function shootBig() {
    var props = {
        size: 60,
        costume: images.purpleBullet,
        effects: [bulletEffects.crazy],
        dir: {
            y: randomBetween(-1, 1)
        }
    }
    var b = makeCustomBullet(props);
    shoot(b);
}

function shootTiny() {
    var props = {
        size: 5,
        speed: 30,
        effects: [bulletEffects.crazy],
        dir: {
            y: randomBetween(-1, 1)
        }
    }
    var b = makeCustomBullet(props);
    shoot(b);
}

function shootIcy() {
    var props = {
        size: 80,
        custome: images.blueBullet,
        effects: [bulletEffects.crazy],
        dir: {
            y: randomBetween(-1, 1)
        }
    }
    var b = makeCustomBullet(props);
    shoot(b);
}