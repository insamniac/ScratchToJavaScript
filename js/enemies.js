function makeEnemy() {

    var enemy = {
        type: 'enemy',
        speed: 4,
        size: 300,
        costume: images.dragon,
        dir: {
            y: 0,
            x: 0
        },
        pos: {
            y: canvas.height * Math.random(),
            x: canvas.width * Math.random()
        }
    };

    return enemy;


}