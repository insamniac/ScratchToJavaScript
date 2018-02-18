DEBUG=true

function randomBetween(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function areTouching(obj1, obj2) {
    var distance = getDistance(obj1, obj2);
    return (distance < (obj1.size / 2 + obj2.size / 2));
}

function getDistance(obj1, obj2) {
    // this seems odd, but we want to make sure we're getting the distance from the center of the object
    var x1 = obj1.pos.x + obj1.size / 2;
    var y1 = obj1.pos.y + obj1.size / 2;
    var x2 = obj2.pos.x + obj1.size / 2;
    var y2 = obj2.pos.y + obj1.size / 2;
    var dx = x1 - x2;
    var dy = y1 - y2;
    
    if (DEBUG) {
         var ctx= state.context;
        state.renders.push(function() {
         ctx.strokeStyle = 'rgb('+randomBetween(0,255)+',' + 
                                 randomBetween(1,255) + ',' + 
                                 randomBetween(1,255) + ')';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        });

    }
    return Math.sqrt(dx * dx + dy * dy);
}

function findClosestOfType(obj1, type) {
    var objectMap = {};
    state.entities.forEach(function(obj2) {
        if (obj2.type == type) {
            var distance = getDistance(obj1, obj2);
            objectMap[distance] = obj2;
        }
    })
    var smallestDistance = Math.min.apply(Math, Object.keys(objectMap));
    return objectMap[smallestDistance];

}
// Code taken from stackoverflow.com
// https://stackoverflow.com/questions/22235360/how-to-efficiently-calculate-nearest-2d-points-in-javascript
function distanceBetweenPoints(p1, p2) {
    return Math.abs(Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1])));
}
