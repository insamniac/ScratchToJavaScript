function randomBetween(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function areTouching(obj1, obj2) {
    var dx = obj1.pos.x - obj2.pos.x;
    var dy = obj1.pos.y - obj2.pos.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < (obj1.size / 2 + obj2.size / 2));
}

function findClosestOfType(obj1, type) {
    var objectMap = {};
    state.entities.forEach(function(obj2) {
        if (obj2.type == type) {
            var distance = distanceBetweenPoints([obj1.pos.x, obj1.pos.y], [obj2.pos.x, obj2.pos.y]);
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