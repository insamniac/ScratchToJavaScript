function makeEnemy() {

 var enemyFunctionsList = [makeDragon, makeCrazyBat, makeBlackBat, makeBrownBat, makeGhost, makeGhoul];
 var newEnemy = null;
 while (newEnemy == null) {

     var randomNumber = randomBetween(0, enemyFunctionsList.length - 1);
     var chosenFunction = enemyFunctionsList[randomNumber];
     newEnemy = chosenFunction();
      setEnemyDefaults(newEnemy);

     var distanceToWitch = getDistance(newEnemy, player);
      if (distanceToWitch < newEnemy.size * 2 + 300){
        newEnemy = null;
        console.log("The enemy was too close to exist in this 2D world.. R.I.P. Muahahahaha...");
      }
 }

  return newEnemy;
}

function setEnemyDefaults(enemy) {
  enemy.dir = { y: 0, x: 0 };
  enemy.pos = { y: canvas.height * Math.random(),
                x: canvas.width * Math.random()
              };
          enemy.sound = "ugh";
}

function makeDragon() {
    var dragon = {
        type: 'enemy',
        speed: 4,
        size: randomBetween(200, 400),
        costume: images.dragon
    };
    return dragon;
}

function makeBlackBat() {
    var bat = {
        type: 'enemy',
        speed: 4,
        size: randomBetween(100, 300),
        costume: images.blackBat
    };
    return bat;
}



function makeBrownBat() {

    var bat = {
        type: 'enemy',
        speed: 3,
        size: randomBetween(100, 300),
        costume: images.brownBat

    };

    return bat;
}

function makeCrazyBat() {

    var bat = {
        type: 'enemy',
        speed: 5,
        size: randomBetween(50, 200),
        costume: images.brownBat,
        effects: [motionEffects.crazy]
    };

    return bat;
}
function makeGhost() {
    var ghost = {
        type: 'enemy',
        speed: 6,
        size: randomBetween(200, 350),
        costume: images.ghost,
        effects: [motionEffects.crazy]
    };
    return ghost;
}

function makeGhoul() {
    var ghoul = {
        type: 'enemy',
        speed: 12,
        size: randomBetween(333, 555),
        costume: images.ghoul
    };
    return ghoul;
}
