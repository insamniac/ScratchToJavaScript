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

function setPowerupDefaults(powerup) {
  powerup.dir = { y: 0, x: 0 };
  powerup.pos = { y: canvas.height * Math.random(),
                x: canvas.width * Math.random()
              };
}

function makeLifeHippo() {
    var lifeHippo = {
        type: 'powerup',
        speed: 9,
        size: 40,
        costume: images.life
    };
    return lifeHippo;
}
