function makeEnemy() {
//var enemyFunctionsList = [makeDragon, makeCrazyBat, makeBlackBat, makeBrownBat];
  var enemyFunctionsList = [makeDragon, makeCrazyBat];

  var choiceNumber = randomBetween(0, enemyFunctionsList.length - 1);

  var chosenFunction = enemyFunctionsList[choiceNumber];

  return chosenFunction();
}

function makeDragon() {

    var dragon = {
        type: 'enemy',
        speed: 4,
        size: randomBetween(200, 400),
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

    return dragon;


}

function makeBlackBat() {

    var bat = {
        type: 'enemy',
        speed: 2,
        size: randomBetween(100, 300),
        costume: images.blackBat,
        dir: {
            y: 0,
            x: 0
        },
        pos: {
            y: canvas.height * Math.random(),
            x: canvas.width * Math.random()
        }
    };

    return bat;
}



function makeBrownBat() {

    var bat = {
        type: 'enemy',
        speed: 3,
        size: randomBetween(100, 300),
        costume: images.brownBat,
        dir: {
            y: 0,
            x: 0
        },
        pos: {
            y: canvas.height * Math.random(),
            x: canvas.width * Math.random()
        }
    };

    return bat;
}

function makeCrazyBat() {

    var bat = {
        type: 'enemy',
        speed: 5,
        size: randomBetween(50, 200),
        costume: images.brownBat,
        dir: {
            y: 0,
            x: 0
        },
        pos: {
            y: canvas.height * Math.random(),
            x: canvas.width * Math.random()
        },
        effects: [motionEffects.crazy]
    };

    return bat;
}
