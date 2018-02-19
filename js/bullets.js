function makeBullet() {

    var bullet = {
        type: 'bullet',
        speed: BULLET_SPEED,
        size: BULLET_SIZE,
        costume: images.bullet,
        dir: {
            y: 0
        },
        pos: {
            y: player.pos.y
        }
    };

if (BULLET_SIZE > 20) {
    bullet.costume=images.blueBullet;

}
if (BULLET_SIZE > 40) {
    bullet.costume=images.purpleBullet;

}
if (BULLET_SIZE > 60) {
    bullet.costume=images.fireBullet;1

}



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
    if (player.bullets <= 0) {
        return;
    }
        bullet.dir.y = player.dir.y / 4;
    if (player.costume == player.img.right) {
        bullet.dir.x = 1;
        bullet.pos.x = player.pos.x + player.size / 2 + bullet.size / 2;

    } else {
        bullet.dir.x = -1;
        bullet.pos.x = player.pos.x - player.size / 2 - bullet.size / 2;

    }
    entities.push(bullet);
    sounds.play('bullet');
    player.bullets-=1;
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
