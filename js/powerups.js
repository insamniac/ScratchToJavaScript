function makePowerup() {

 var powerupFunctionsList = [makeLifeHippo];
 var newPowerup = null;
 while (newPowerup == null) {

     var randomNumber = randomBetween(0, powerupFunctionsList.length - 1);
     var chosenFunction = powerupFunctionsList[randomNumber];
     newPowerup = chosenFunction();
      setPowerupDefaults(newPowerup);

     var distanceToWitch = getDistance(newPowerup, player);
      if (distanceToWitch < 801){
        newPowerup = null;
        console.log("The powerup was too close to exist in this 2D world.. R.I.P. Muahahahaha...");
      }
 }

  return newPowerup;
}
function makeLife() {

 var lifeFunctionsList = [makeLifeStar];
 var newLife = null;
 while (newLife == null) {

     var randomNumber = randomBetween(0, lifeFunctionsList.length - 1);
     var chosenFunction = lifeFunctionsList[randomNumber];
     newLife = chosenFunction();
      setPowerupDefaults(newLife);

     var distanceToWitch = getDistance(newLife, player);
      if (distanceToWitch < 801){
        newLife = null;
        console.log("The life was too close to exist in this 2D world.. DIE YOU BLASTED WORM DROPPINGS!");
      }
 }

  return newLife;
}
function setPowerupDefaults(powerup) {
  powerup.dir = { y: randomBetween(-5,5), x: randomBetween(-5,5) };
  powerup.pos = { y: canvas.height * Math.random(),
                x: canvas.width * Math.random()
              };
}

function makeLifeHippo() {
    var lifeHippo = {
        type: 'powerup',
        speed: 0.1,
        size: 40,
        costume: images.life
    };
    return lifeHippo;
}
function makeLifeStar() {
    var lifeStar = {
        type: 'life',
        speed: 10,
        size: 40,
        costume: images.powerup
    };
    return lifeStar;
}
