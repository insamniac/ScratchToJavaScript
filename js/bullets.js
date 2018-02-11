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


function shootNormal() {
    shoot(makeBullet());
}

function shootBig() {
    var props = {
        size: 60,
        costume: images.purpleBullet,
        effects: [motionEffects.crazy],
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
        speed: 10,
        effects: [motionEffects.crazy, motionEffects.goToEnemy],
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
        effects: [motionEffects.crazy],
        dir: {
            y: randomBetween(-1, 1)
        }
    }
    var b = makeCustomBullet(props);
    shoot(b);
}
