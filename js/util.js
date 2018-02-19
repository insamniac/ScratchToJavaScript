function randomBetween(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function areTouching(obj1, obj2, buffer) {
    buffer = buffer || 10;
    var distance = getDistance(obj1, obj2);
    return (distance  < (obj1.size / 2 + obj2.size / 2) - buffer);
}

function getDistance(obj1, obj2) {
    var x1 = obj1.pos.x ;
    var y1 = obj1.pos.y ;
    var x2 = obj2.pos.x ;
    var y2 = obj2.pos.y ;
    var dx = x1 - x2;
    var dy = y1 - y2;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function findClosestOfType(obj1, type) {
    var objectMap = {};
    entities.forEach(function(obj2) {
        if (obj2.type == type) {
            var distance = getDistance(obj1, obj2);
            objectMap[distance] = obj2;
        }
    })
    var smallestDistance = Math.min.apply(Math, Object.keys(objectMap));
    return objectMap[smallestDistance];

}


function bounce(obj) {
    if (obj.pos.x < 0 && obj.dir.x < 0) {
        obj.dir.x *= -1;
    } else if (obj.pos.x > canvas.width && obj.dir.x > 0) {
        obj.dir.x *= -1;
    } else if (obj.pos.y < 0 && obj.dir.y < 0) {
        obj.dir.y *= -1;
    } else if (obj.pos.y > canvas.height && obj.dir.y > 0) {
        obj.dir.y *= -1;
    }
    

}
